import { useState } from 'react'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import Page from '~/components/layout/page'
import { EnforceAuth } from '~/components/misc/enforceAuth'
import Insights from '~/components/pages/app/proposals/insights'
import OperationalProposals from '~/components/pages/app/proposals/operationalProposals'
import CreateNewProposal from '~/components/pages/app/proposals/popups/createProposal'
import ViewProposal from '~/components/pages/app/proposals/popups/viewProposal'
import ProposalCards from '~/components/pages/app/proposals/proposalCards'

const Proposals = () => {
  const [openCreateProposal, setOpenCreateProposal] = useState(false)
  const [viewProposal, setViewProposal] = useState(false)
  const [proposalID, setProposalID] = useState(0)

  return (
    <Page>
      <div className='w-full text-vdao-dark'>
        <OperationalProposals setOpenCreateProposal={setOpenCreateProposal} />
        <EnforceAuth>
          <ProposalCards setViewProposal={setViewProposal} setProposalID={setProposalID} />

          <div className='px-6 md:px-10 xl:px-0'>
            <Insights />
          </div>

          {openCreateProposal && <CreateNewProposal show={openCreateProposal} close={() => setOpenCreateProposal(false)} />}

          {viewProposal && <ViewProposal show={viewProposal} proposalID={proposalID} close={() => setViewProposal(false)} />}
        </EnforceAuth>
      </div>

      {/* <Footer /> */}
    </Page>
  )
}

export default Proposals
