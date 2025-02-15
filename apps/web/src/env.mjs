import { z } from 'zod'

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXTAUTH_JWT_SECRET: process.env.NODE_ENV === 'production' ? z.string().min(1) : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    str => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? z.string().min(1) : z.string().url(),
  ),
  POSTGRES_URL: z.string().min(1),
  POSTGRES_PRISMA_URL: z.string().min(1),
  POSTGRES_URL_NON_POOLING: z.string().min(1),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_HOST: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DATABASE: z.string().min(1),

  TENDERLY_USER: z.string().min(1).optional(),
  TENDERLY_PROJECT: z.string().min(1).optional(),
  TENDERLY_ACCESS_KEY: z.string().min(1).optional(),
  TENDERLY_TTL: z.string().regex(/^\d+$/).optional(),

  PINATA_PRIVATE_KEY: z.string().min(1),
  PINATA_API_SECRET: z.string().min(1),
  PINATA_API_JWT: z.string().min(1),
  PINATA_API_KEY: z.string().min(1),

  NEXT_PUBLIC_INFURA_ID: z.string().min(1).optional(),
})

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
})

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_JWT_SECRET: process.env.NEXTAUTH_JWT_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  POSTGRES_URL: process.env.POSTGRES_URL,
  POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
  POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,

  TENDERLY_ACCESS_KEY: process.env.TENDERLY_ACCESS_KEY,
  TENDERLY_USER: process.env.TENDERLY_USER,
  TENDERLY_PROJECT: process.env.TENDERLY_PROJECT,
  TENDERLY_TTL: process.env.TENDERLY_TTL,

  PINATA_PRIVATE_KEY: process.env.PINATA_PRIVATE_KEY,
  PINATA_API_SECRET: process.env.PINATA_API_SECRET,
  PINATA_API_JWT: process.env.PINATA_API_JWT,
  PINATA_API_KEY: process.env.PINATA_API_KEY,

  NEXT_PUBLIC_INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID,
}

// Don't touch the part below
// --------------------------

const merged = server.merge(client)

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env)

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === 'undefined'

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  )

  if (parsed.success === false) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables')
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
        throw new Error(
          process.env.NODE_ENV === 'production'
            ? '❌ Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        )
      return target[/** @type {keyof typeof target} */ (prop)]
    },
  })
}

export { env }
