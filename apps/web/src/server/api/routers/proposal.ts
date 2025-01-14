import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'
import VDAOImplementation from '~/abi/VDAOImplementation.json'
import { fetchTransaction, readContracts, waitForTransaction } from '@wagmi/core'
import { Address, decodeEventLog } from 'viem'
import { TRPCError } from '@trpc/server'
import { currentContracts } from '~/config/contracts'
import { log } from 'console'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const includeZod = z
  .object({
    pod: z.boolean().optional(),
    author: z.boolean().optional(),
  })
  .optional()

export const proposalRouter = createTRPCRouter({
  getProposal: publicProcedure
    .input(
      z.object({
        id: z.number(),
        include: includeZod,
      }),
    )
    .query(async ({ input: { id, include }, ctx: { prisma } }) => {
      let web3Proposal = {} as any
      const web2Proposal = await prisma.proposal.findUnique({
        where: { id: id },
        include: include,
      })

      const proposalValues = await readContracts({
        contracts: [
          {
            abi: VDAOImplementation as any,
            address: currentContracts.proxiedVDao as Address,
            functionName: 'proposals',
            args: [id],
          },
        ],
      })

      const argkeys: string[] = ['id', 'proposer', 'proposalThreshold', 'eta', 'startBlock', 'endBlock', 'forVotes', 'againstVotes', 'abstainVotes', 'canceled', 'executed', 'vetoed']

      for (let i = 0; i < argkeys.length; i++) {
        const key = argkeys[i] as string

        const value = (proposalValues[0].result as any)[i]

        if (value === undefined) continue

        web3Proposal[key] = value
      }

      if (!web2Proposal || !web3Proposal) throw new Error('Proposal not found')

      return { ...web3Proposal, ...web2Proposal }
    }),

  getProposals: publicProcedure
    .input(
      z.object({
        ids: z.array(z.number()).max(10, 'Too many ids').optional(),
        include: includeZod,
      }),
    )
    .query(async ({ input: { ids, include }, ctx: { prisma } }) => {
      const web2Proposals = await prisma.proposal.findMany({
        ...(ids && { where: { id: { in: ids } } }),
        include: include,
        take: 10,
        orderBy: { createdAt: 'desc' },
      })

      const proposalValues = await readContracts({
        contracts: web2Proposals.map(proposal => ({
          abi: VDAOImplementation as any,
          address: currentContracts.proxiedVDao as Address,
          functionName: 'proposals',
          args: [proposal.id],
        })),
      })

      const argkeys: string[] = ['id', 'proposer', 'proposalThreshold', 'eta', 'startBlock', 'endBlock', 'forVotes', 'againstVotes', 'abstainVotes', 'canceled', 'executed', 'vetoed']

      const proposals = web2Proposals.map((proposal, idx) => {
        const web3Proposal = {} as any

        for (let i = 0; i < argkeys.length; i++) {
          const key = argkeys[i] as string

          const value = proposalValues[idx]?.result?.[i]

          if (value === undefined) continue

          web3Proposal[key] = value
        }

        return { ...web3Proposal, ...proposal }
      })

      if (!proposals || proposals.length === 0) throw new Error('Proposals not found')
      return proposals
    }),

  createGrantProposal: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        picture: z.string().optional(),
        podId: z.number().optional(),
        transactionHash: z.string(),
        authorAddress: z.string(),
        include: includeZod,

        spells: z.array(z.string()).max(10, 'Too many spells'),
        spellValues: z.array(z.bigint()).max(10, 'Too many spell values'),
        spellCalldatas: z.array(z.string()).max(10, 'Too many spell calldatas'),
      }),
    )
    .mutation(
      async ({
        input: { podId, authorAddress, transactionHash, include, title, description, picture, spells, spellValues, spellCalldatas },
        ctx: {
          prisma,
          session: { address },
        },
      }) => {
        if (!address) throw new Error('User not found')

        const transaction = await waitForTransaction({ hash: transactionHash as Address })
        if (!transaction) throw new TRPCError({ code: 'NOT_FOUND', message: 'Transaction not found' })

        const logs = transaction.logs || []
        if (logs.length === 0 || !logs[0]?.topics) throw new TRPCError({ code: 'NOT_FOUND', message: 'Log not found' })

        const txEvent = decodeEventLog({
          abi: VDAOImplementation,
          eventName: 'ProposalCreated',
          topics: logs[0].topics,
          data: logs[0].data,
        })

        if (!txEvent) throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' })
        if ((txEvent.args as any).description !== description) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Description does not match' })
        if (
          !Object.values(currentContracts)
            .map(el => el.toString().toLowerCase())
            .includes(transaction.to?.toLowerCase() as Address)
        )
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Transaction not sent to VDAO' })

        // all good

        const newProposal = await prisma.proposal.create({
          data: {
            id: Number((txEvent.args as any).id),
            title,
            description,
            picture,

            spells,
            spellValues,
            spellCalldatas,
            spellSignatures: (txEvent.args as any).spellSignatures,

            ...(podId && { pod: { connect: { id: podId } } }),

            author: { connect: { address: authorAddress } },
            transactionHash: transactionHash,

            createdBy: { connect: { address } },
            updatedBy: { connect: { address } },
          },
          include: include,
        })

        return newProposal
      },
    ),

  generateIPFSHash: protectedProcedure
    .input(
      z.object({
        authorAddress: z.string(),
        name: z.string(),
        description: z.string(),
        rules: z.string(),
        token: z.string(),
        amount: z.string(),
        image: z.string(),
        theme: z.string(),
      }),
    )
    .mutation(async ({ input: { authorAddress, name, description, rules, token, amount, image, theme }, ctx: { prisma } }) => {
      const ipfs = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.PINATA_API_JWT,
        },
        body: JSON.stringify({
          content: {
            name: name,
            rules: rules,
            description: description,
            image: image,
            theme: theme,

            external_url: 'https://vdao.app',

            token: token,
            amount: amount,

            author: authorAddress,
          },
        }),
      })

      return ipfs.json()
    }),

  createProposal: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        picture: z.string().optional(),
        podId: z.number().optional(),
        transactionHash: z.string(),
        authorAddress: z.string(),
        include: includeZod,

        spells: z.array(z.string()).max(10, 'Too many spells'),
        spellValues: z.array(z.bigint()).max(10, 'Too many spell values'),
        spellCalldatas: z.array(z.string()).max(10, 'Too many spell calldatas'),
        spellSignatures: z.array(z.string()).max(10, 'Too many spell signatures'),
        grant: z.boolean().optional(),
      }),
    )
    .mutation(
      async ({
        input: { podId, authorAddress, transactionHash, include, title, description, picture, spells, spellValues, spellCalldatas, spellSignatures, grant },
        ctx: {
          prisma,
          session: { address },
        },
      }) => {
        if (!address) throw new Error('User not found')

        const transaction = await waitForTransaction({ hash: transactionHash as Address })
        if (!transaction) throw new TRPCError({ code: 'NOT_FOUND', message: 'Transaction not found' })

        const logs = transaction.logs || []
        if (logs.length === 0 || !logs[0]?.topics) throw new TRPCError({ code: 'NOT_FOUND', message: 'Log not found' })

        const txEvent = decodeEventLog({
          abi: VDAOImplementation,
          eventName: 'ProposalCreated',
          topics: logs[0].topics,
          data: logs[0].data,
        })

        if (!txEvent) throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' })
        if ((txEvent.args as any).description !== description) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Description does not match' })
        if (
          !Object.values(currentContracts)
            .map(el => el.toString().toLowerCase())
            .includes(transaction.to?.toLowerCase() as Address)
        )
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Transaction not sent to VDAO' })

        // all good
        const newProposal = await prisma.proposal.create({
          data: {
            id: Number((txEvent.args as any).id),
            title,
            description,
            picture,

            spells,
            spellValues,
            spellCalldatas,
            spellSignatures,

            ...(podId && { pod: { connect: { id: podId } } }),

            author: { connect: { address: authorAddress } },
            transactionHash: transactionHash,

            createdBy: { connect: { address } },
            updatedBy: { connect: { address } },
            grant,
          },
          include: include,
        })

        return newProposal
      },
    ),
})
