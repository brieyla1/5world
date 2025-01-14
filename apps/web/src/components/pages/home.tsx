import Image, { StaticImageData } from 'next/image'
import WelcomeHero from 'public/illustrations/home/PNG/VDAO-home-hero.png'
import WelcomeHeroMobile from 'public/illustrations/home/SVG/01_main_illo_v02 1.svg'
import IntroHero from 'public/illustrations/home/PNG/VDAO-home-intro.png'

import CreateIcon from 'public/icons/home/VDAO-icon-home-create.svg'
import FundRaiseIcon from 'public/icons/home/VDAO-icon-home-fundraise.svg'
import ImagineIcon from 'public/icons/home/VDAO-icon-home-imagine.svg'
import InnovateIcon from 'public/icons/home/VDAO-icon-home-innovate.svg'
import BetterNatureIcon from 'public/illustrations/home/SVG/Better-Nature.svg'
import WorseNatureIcon from 'public/illustrations/home/SVG/Worse-Nature.svg'
import NatureIcon from 'public/illustrations/home/SVG/Nature.svg'

import CorrectIcon from 'public/icons/home/Correct-Icon.svg'
import InCorrectIcon from 'public/icons/home/InCorrect-Icon.svg'

import VDAOGetInvolved from 'public/illustrations/home/PNG/VDAO-get-involved.png'

import FifthWorldIcon from 'public/illustrations/partners/5thWorld.svg'
import ConsensysIcon from 'public/illustrations/partners/Consensys.svg'
import SupportVDAOIcon from 'public/illustrations/partners/Support-VDAO.svg'

import FifthworldLogo from 'public/thirdparty/5world.png'
import ConsensysLogo from 'public/thirdparty/consensys.png'
import DecentralandLogo from 'public/thirdparty/decentraland.png'
import DiscoLogo from 'public/thirdparty/disco.png'
import EtheraLogo from 'public/thirdparty/ethera.png'
import InfuraLogo from 'public/thirdparty/infura.png'
import PalmLogo from 'public/thirdparty/palm.png'
import PleasrDaoLogo from 'public/thirdparty/pleasrdao.png'
import PleasrHouseLogo from 'public/thirdparty/pleasrHouse.png'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { Section } from '../layout/section'

export function HomeCTAComponent() {
  return (
    <Section className='flex flex-col items-center bg-gradient-to-r from-vdao-light to-vdao-dark px-6 py-[64px] md:py-[100px] md:px-8 xl:px-0'>
      <div className='text-center font-heading text-[36px] font-medium text-white md:text-[46px]'>Ready to Join?</div>
      <div className='mt-5 w-full max-w-3xl text-center font-body text-[22px] leading-[26px] text-white md:mt-[25px] md:text-[26px] md:leading-[30px]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis mi, faucibus vitae elementum id, tristique at lectus.
      </div>
      <PrimaryButton text=' Apply Now' className=' mx-auto mt-[36px] mr-auto bg-vdao-light md:mt-[62px]' />
    </Section>
  )
}

export function HomePartnersComponent() {
  return (
    <Section className='overflow-hidden px-6 text-vdao-dark md:px-8 xl:px-0'>
      <div className='mx-auto flex max-w-[1280px] flex-col md:flex-row'>
        <div className='mt-24 max-w-[1280px] md:mx-auto md:w-1/2 '>
          <div className='mb-6 w-full text-left font-heading text-[32px] font-medium text-vdao-dark md:text-[46px]'>Our Partners</div>
          <div className='leading[26px] max-w-sm font-body text-[22px] font-medium text-vdao-dark md:text-[26px] md:leading-[30px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis mi.
          </div>
        </div>
        <div className='mx-auto mt-10 mb-16 grid w-full scale-95 grid-flow-col grid-cols-2 grid-rows-5 gap-20 opacity-70 md:mt-28 md:mb-0 md:scale-75 md:grid-cols-3 md:grid-rows-3'>
          <Image src={FifthworldLogo} alt='VDAO' className='w-full' />
          <Image src={ConsensysLogo} alt='VDAO' className='w-full' />
          <Image src={DecentralandLogo} alt='VDAO' className='w-full' />
          <Image src={DiscoLogo} alt='VDAO' className='w-full' />
          <Image src={EtheraLogo} alt='VDAO' className='w-full' />
          <Image src={InfuraLogo} alt='VDAO' className='w-full' />
          <Image src={PalmLogo} alt='VDAO' className='w-full' />
          <Image src={PleasrDaoLogo} alt='VDAO' className='w-full' />
          <Image src={PleasrHouseLogo} alt='VDAO' className='w-full' />
        </div>
      </div>
    </Section>
  )
}

export function HomeCommunityComponent() {
  return (
    <Section className='relative mt-20 bg-vdao-dark px-6 text-vdao-light md:mt-[140px] '>
      <div className='relative mx-auto flex max-w-[1440px] flex-col md:pb-48 '>
        <div className='z-10 mt-24'>
          <div className='mb-4 font-heading text-[32px] font-medium md:mb-6 md:ml-9 md:text-[46px] lg:ml-[94px]'>Community</div>
          <div className='md:font-satoshi font-heading text-[22px] font-medium text-white md:ml-9 md:text-[26px] lg:ml-[94px]'>The VDAO Community is:</div>
        </div>
        <div className='mt-12 flex flex-col-reverse md:flex-row'>
          <div className='z-10 mb-[463px] grid gap-12 md:ml-[20%] md:mb-0 md:grid-cols-2 md:gap-0 lg:ml-[40%]'>
            <div className='flex  flex-col gap-4 md:w-9/12'>
              <div className='font-body text-[26px] font-medium md:font-heading md:text-3xl'>Apolitical</div>
              <div className='font-body text-lg font-normal leading-[22px] text-white'>
                We welcome members from all walks of life and political beliefs if they are aligned with the DAO’s core values and mission.
              </div>
            </div>
            <div className='flex flex-col gap-4  md:w-10/12 lg:w-9/12'>
              <div className='font-body text-[26px] font-medium md:font-heading md:text-3xl'>Curious</div>
              <div className='font-body text-lg font-normal leading-[22px] text-white'>
                We exist at the bleeding edge of regenerative agriculture innovation, creating global networks that can bring about a new era of modern agriculture.
              </div>
            </div>
            <div className='flex flex-col gap-4 md:mt-10 md:w-10/12 lg:w-9/12'>
              <div className='font-body text-[26px] font-medium md:font-heading md:text-3xl'>Positive</div>
              <div className='font-body text-lg font-normal leading-[22px] text-white'>We believe that with focus and collective effort, the world's ecosystems can and will be regenerated.</div>
            </div>

            <div className='flex flex-col gap-4 md:mt-10 md:w-10/12 lg:w-9/12'>
              <div className='font-body text-[26px] font-medium md:font-heading md:text-3xl'>Engaged</div>
              <div className=' font-body text-lg font-normal leading-[22px] text-white'>We contribute to regenerative agriculture conversations, developing a vibrant learning culture.</div>
            </div>
          </div>
        </div>
        <div className=' absolute bottom-0 left-0 hidden h-3/6 w-6/12 bg-[url(/illustrations/home/SVG/illusratoin04.svg)] bg-cover bg-bottom bg-no-repeat md:block lg:h-5/6' />
      </div>
      <div className='sm:bg-fit absolute bottom-0 left-0 h-[463px] w-full bg-[url(/illustrations/home/SVG/04_community_illo_nobackground_v011.svg)] bg-cover bg-bottom bg-no-repeat md:hidden' />
    </Section>
  )
}

export function RegeratedWorld() {
  return (
    <Section className='mx-auto mt-20 flex max-w-[1215px] flex-col items-center gap-[31px] md:mt-[140px] lg:flex-row lg:items-start'>
      <div className='z-10 flex flex-col px-6 md:w-11/12 lg:max-w-[514px]'>
        <div className='font-heading text-[32px] font-medium leading-[38px] text-vdao-dark md:text-[46px] md:leading-[52px] lg:max-w-[481px]'>
          Help us create real solutions for a regenerated world.
        </div>
        <div className='mt-5 font-body text-lg font-normal leading-[22px] text-vdao-dark md:mt-9'>
          The solutions to a regenerative future are found in community, and there’s a place for you here among our band of creators, contributors, artists, thinkers, and seekers. 
          <ul className='list-disc p-5 pl-5'>
            <li>
              <b>Feel Empowered</b> to contribute the ideas, leadership, and funds that lead to global change.
            </li>
            <br />
            <li>
              <b>Find Inspiration</b> in the power of community to keep hoping and fighting for a better world.
            </li>
            <br />
            <li>
              <b>Experience Growth</b> as the community challenges you to lean into the endless possibilities of regenerative agriculture.
            </li>
          </ul>
        </div>
        <PrimaryButton text='Join VDAO' className='mt-5' />
      </div>
      <Image width={'0'} height={'0'} src={'illustrations/home/SVG/illustraion02 (2).svg'} alt='VDAO' className='w-full  md:order-first md:hidden' />
      <Image src={IntroHero} alt='VDAO' className='hidden md:block lg:w-6/12 lg:max-w-[670px] xl:w-full' />
    </Section>
  )
}

export function WaysToSupportVDAO() {
  return (
    <Section className='mx-auto mt-20 w-full max-w-[1280px] px-6 md:mt-[140px]'>
      <div className='font-heading text-[32px] font-medium leading-[38px] text-vdao-dark md:text-center md:text-[46px]'>Other Ways to Support VDAO</div>
      <div className='mx-auto mt-10 max-w-[624px] justify-between md:mt-[74px] md:flex'>
        <div className='md:max-w-[250px]'>
          <Image src={SupportVDAOIcon} alt='support' />
          <div className='mt-5 font-heading text-3xl font-medium'>Donate</div>
          <div className='mt-5 font-body text-lg font-normal leading-[22px]'>
            Donate directly to the VDAO treasury to receive an exclusive on-chain badge that highlight’s your impact and unlocks access to quadratic voting in future grants rounds.
          </div>
          <PrimaryButton text='Donate Now' className='mt-5' />
        </div>
        <div className='mt-14 md:mt-0 md:max-w-[274px] '>
          <Image src={SupportVDAOIcon} alt='support' />
          <div className='mt-5 font-heading text-3xl font-medium'>Purchase NFTs</div>
          <div className='mt-5 font-body text-lg font-normal leading-[22px]'>
            Participate in our NFT auction for an opportunity to fund regenerative agriculture innovation, own a unique piece of art, and access real-world learning opportunities and events.
          </div>
          <PrimaryButton text='Learn More' className='mt-5' />
        </div>
      </div>
    </Section>
  )
}

export function HomeGetInvolvedComponent() {
  return (
    <Section className='my-16 mt-20 flex max-w-[1091px] flex-col px-6 md:mt-[140px] lg:mx-auto'>
      <div className='w-full font-heading text-[32px] font-medium leading-[38px] md:text-center md:text-[46px] md:leading-[52px]'>How to Join VDAO</div>
      <div className='mt-4 max-w-[794px] text-lg font-normal leading-[22px] md:mx-auto md:w-full md:text-center md:text-[22px]'>
        Apply now to become a core member of the VDAO community, pledging your time and support towards our mission of global ecosystem regeneration.
      </div>
      <div className='mt-[31px] flex flex-col md:mt-[64px] md:flex-row md:items-start md:gap-5 lg:gap-[84px]'>
        <Image src={VDAOGetInvolved} alt='VDAO' className='w-full max-w-[545px] md:w-5/12 lg:w-full' />

        <div className='max-w-[438px] font-body text-lg font-normal'>
          <div className='py-5 md:py-10'>
            <div className='inline font-heading text-[26px] font-medium md:text-3xl'>1 | Apply</div> by reviewing our manifesto and completing the form here on our site.  
          </div>
          <div className='py-5 md:py-10'>
            <div className='inline font-heading text-[26px] font-medium md:text-3xl'>2 | Interview</div> with a member of our community to find answers to your questions and make sure our values
            align.
          </div>
          <div className='py-5 md:py-10'>
            <div className='inline font-heading text-[26px] font-medium md:text-3xl'>3 | Choose a Guild</div> where you feel you can best contribute to the mission of VDAO. Our four guilds include
            Creative, Research, Fundraising, and DAO Operations. 
          </div>
          <PrimaryButton text='Apply Now' />
        </div>
      </div>
    </Section>
  )
}

export const OurPartners = () => {
  return (
    <Section className='mx-auto mt-[120px] flex max-w-[1141px] flex-col items-center gap-5 px-6 md:mt-[140px] md:flex-row md:gap-[0px] md:px-0'>
      <div>
        <div className='w-full font-heading text-[32px] font-medium leading-[38px] md:text-[46px]'>Our Partners</div>
        <div className='mt-5 max-w-[514px] font-body text-lg font-normal leading-[22px] md:mt-[35px]'>
          <b>5th World</b> is a leading champion in the development of regenerative agriculture solutions. During the formation of the dao, they will serve as stewards of its mission and vision.
          <br />
          <br />
          <b>ConsenSys</b> is the world’s leading Ethereum software company and ensures our members a secure blockchain infrastructure. 
        </div>
      </div>
      <div className='mx-auto flex gap-10 md:flex-col lg:ml-auto lg:mr-0 lg:flex-row'>
        <Image src={FifthWorldIcon} className='md:max-w-auto h-[157px] w-5/12 max-w-[150px] md:w-[212px]' alt='5thworld' />
        <Image src={ConsensysIcon} className='md:max-w-auto h-[157px] w-5/12 max-w-[150px]  md:w-[212px]' alt='Consensys' />
      </div>
    </Section>
  )
}

const ObjectiveSubComponent = ({ icon, title, description }: { icon: StaticImageData; title: string; description: string }) => (
  <div className='flex w-full flex-col items-center gap-5 md:w-10/12 md:items-start'>
    <Image src={icon} alt='VDAO' height={100} />
    <div className='font-heading text-3xl font-medium'>{title}</div>
    <div className='w-full border-y-[1px] border-vdao-dark' />
    <div className='text-center font-inter text-base font-normal leading-5 text-vdao-dark md:text-left md:font-body md:text-lg'>{description}</div>
  </div>
)

export function HomeObjectivesComponent() {
  return (
    <Section className='xl:p-O md:lg-14 mx-auto mt-[52px] flex max-w-[1141px] flex-col p-0 px-6 md:mt-[162px] md:px-10'>
      <div className='w-full font-heading text-[32px] font-medium leading-[38px] md:text-center md:text-[46px] md:leading-[52px]'>How does VDAO support regeneration?</div>
      <div className='mt-5 max-w-[702px] text-lg font-normal leading-[22px] md:mx-auto md:mt-4 md:w-full md:text-center md:text-[22px]'>
        VDAO invites art and science to lead each other to new discoveries and collaborate in creating scalable systems for planetary regeneration.
      </div>
      <div className='mx-auto mt-10 flex flex-col gap-14 px-8 md:mt-16 md:flex-row md:gap-10 md:px-0'>
        <ObjectiveSubComponent
          icon={InnovateIcon}
          title='Innovate'
          description='We provide grants to researchers, research initiatives and individuals working in and around the field of regenerative agriculture.'
        />
        <ObjectiveSubComponent
          icon={FundRaiseIcon}
          title='Fundraise'
          description="We provide opportunities for individuals and institutions to donate to meaningful research initiatives and R&D that will regenerate the world's ecosystems."
        />
        <ObjectiveSubComponent
          icon={CreateIcon}
          title='Create'
          description='We are thought leaders within regenerative agriculture conversations, producing content that clearly communicates our vision, mission and the impact of the projects we support.'
        />
        <ObjectiveSubComponent
          icon={ImagineIcon}
          title='Imagine'
          description='Our art and our vision helps others to experience how the world might look and feel once VDAO’s core mission is achieved.'
        />
      </div>
      <PrimaryButton text='Join VDAO' className='mx-auto mt-10' />
    </Section>
  )
}

export function HomeFindYourPlace() {
  return (
    <Section className='mx-auto mt-[101px] flex max-w-[1247px] flex-col items-center gap-5 md:mt-[161px] md:gap-[63px] lg:flex-row'>
      <div className='z-10 flex flex-col px-6 md:w-10/12 md:px-0 lg:max-w-[514px]'>
        <div className='font-heading text-[32px] font-medium leading-[38px] text-vdao-dark md:text-[46px] md:leading-[52px] lg:max-w-[470px]'>
          Find your place in the story of planetary regeneration.
        </div>
        <div className='mt-5 font-body text-lg font-normal leading-[22px] text-vdao-dark md:mt-[35px]'>
          Welcome to a decentralized community where imagination and science converge to build promising regenerative pathways towards the future.
          <br />
          <br />
          Using Web 3.0, we unite artists, land stewards, funders, scientists, researchers, and innovators into <b>one massive, global research and development team</b> for scalable advancements in
          regenerative land management.
        </div>
        <PrimaryButton text='Join VDAO' className='mt-5' />
      </div>
      <Image width={'0'} height={'0'} src={'illustrations/home/SVG/illustraion02 (2).svg'} alt='VDAO' className='w-full md:order-first lg:hidden' />
      <Image src={IntroHero} alt='VDAO' className='hidden max-w-[670px] md:w-5/12 lg:order-first lg:block lg:w-6/12' />
    </Section>
  )
}

const NatureSubComponent = ({ icon, title, description, correctIcon }: { icon: StaticImageData; title: string; description: string; correctIcon: boolean }) => (
  <div className='col-span-4 flex flex-col items-center gap-5 md:items-start'>
    <Image src={icon} alt='VDAO' height={200} />
    <div className='flex items-start gap-2'>
      <Image src={correctIcon ? CorrectIcon : InCorrectIcon} className='pt-2' alt='Correct/Incorrect' />
      <div>
        <div className='max-w-[213px] font-heading text-3xl font-medium leading-[36px] '>{title}</div>
        <div className='mt-5 max-w-[320px] text-lg font-normal leading-[22px] text-vdao-dark md:text-left'>{description}</div>
      </div>
    </div>
  </div>
)

export function HomeRegenerativeAgri() {
  return (
    <Section className='md:lg-14 mx-auto mt-[44px] flex w-full max-w-[1141px] flex-col px-6 md:mt-[140px] md:px-10 lg:px-0'>
      <div className='w-full font-heading text-[32px] font-medium leading-8 md:text-center md:text-[46px] md:leading-[52px]'>What is regenerative agriculture?</div>
      <div className='mt-5 max-w-[884px] text-lg font-normal leading-[22px] md:mx-auto md:mt-4 md:w-full md:text-center md:text-[22px]'>
        Rather than attempt to control nature, regeneration is a way to work WITH it. Your land knows how to heal itself, and the Regenerative Paradigm in agriculture is the key to designing an
        antifragile, resilient ecosystem.
      </div>
      <div className='mx-auto mt-10 flex grid-cols-12 flex-col gap-[34px] md:mt-[76px] md:grid md:flex-row md:gap-10 md:px-0'>
        <NatureSubComponent
          icon={BetterNatureIcon}
          title='We are better than nature'
          description='The Degenerative Paradigm sees humans above nature, taking what they want without respect for the consequences. It asks, "How do I get more?"'
          correctIcon={false}
        />
        <NatureSubComponent
          icon={WorseNatureIcon}
          title='We are worse than nature'
          correctIcon={false}
          description='The Sustainable Paradigm is a stark reaction to the Degenerative. It views humans as the problem and asks, "How do / cause less damage?"'
        />
        <NatureSubComponent
          icon={NatureIcon}
          title='We are nature'
          correctIcon={true}
          description='The Regenerative Paradigm sees humans as part of a community in partnership with all living things where everyone can thrive. It asks, "How do I do more good?"'
        />
      </div>
      <PrimaryButton text='Join VDAO' className='mx-auto mt-5 md:mt-10' />
    </Section>
  )
}

export function HomeIntroComponent() {
  return (
    <Section className='mx-auto mt-[34px] flex max-w-[1215px] flex-col items-center gap-[31px] md:mt-[140px] lg:flex-row lg:items-start'>
      <div className='z-10 flex flex-col px-6 md:w-11/12 lg:max-w-[514px]'>
        <div className='font-heading text-[32px] font-medium leading-8 text-vdao-dark md:text-[46px] md:leading-[52px] lg:max-w-[418px] '>It’s time to step out of reaction mode.</div>
        <div className=' mt-[21px] font-body text-lg font-normal leading-[22px] text-vdao-dark md:mt-[35px]'>
          <b>Out of fear, humanity keeps looking for new ways to control our ecosystems.</b>
          <ul className='list-disc p-5 pl-5'>
            <li>Commercial farming looks for new ways to extract value from the land.</li>
            <li>Activists look for new ways to protect it. (Which is just another form of control.)</li>
          </ul>

          <div>
            Doomsday predictions and the illusion of control lead us to react and double down on our desire to “do something” instead of stopping to ask if our perspective is clear to begin with.
          </div>
          <br />
          <div>
            Humanity is in desperate need of a new agricultural paradigm. So, what if we stop trying to control nature? <b>What if we partner with it instead? </b>
          </div>
        </div>
        <PrimaryButton text='Join VDAO' className='mt-5' />
      </div>
      <Image width={'0'} height={'0'} src={'illustrations/home/SVG/illustraion02 (2).svg'} alt='VDAO' className='w-full  md:order-first md:hidden' />

      <Image src={IntroHero} alt='VDAO' className='hidden max-w-[670px] md:block lg:w-6/12 xl:w-full' />
    </Section>
  )
}

export function HomeWelcomeComponent() {
  return (
    <Section className='mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden md:overflow-visible'>
      <div className='mx-auto mt-8 md:mt-16'>
        <div className='mx-auto w-full max-w-[1124px] px-[33px] text-center font-heading text-[44px] font-medium leading-[48px] text-vdao-dark md:w-auto md:px-5 md:text-[50px] md:leading-[75px] lg:px-0 lg:text-[70px] lg:leading-[95px]'>
          Help build new pathways to planetary regeneration.
        </div>
        <div className='mx-[45px] mt-5 max-w-[818px] text-center font-body text-lg font-medium leading-[26px] text-vdao-dark md:mx-auto md:hidden md:w-full md:px-6 md:text-xl lg:px-0'>
          Join our DAO’s mission to realize the promise and potential of regenerative agriculture. Inspire new ideas, fund research, and help create scalable solutions for global change. 
        </div>
      </div>

      <main className='z-10 w-full md:hidden '>
        <PrimaryButton text='Join Us' className='relative bottom-[-40px] !mx-auto' />
        <Image alt='' src={WelcomeHeroMobile} className='top[-50px] relative -z-10 h-[336px] w-full' />
      </main>

      <main className='relative hidden h-[722px] w-full max-[1400px]:h-[50.139vw] md:block '>
        <div className='mx-[45px] max-w-[818px] text-center font-body text-lg font-medium leading-[26px] text-vdao-dark md:mx-auto md:w-full md:px-6 md:text-xl lg:px-0'>
          Join our DAO’s mission to realize the promise and potential of regenerative agriculture. Inspire new ideas, fund research, and help create scalable solutions for global change. 
        </div>
        <PrimaryButton text='Join Us' className='z-50 !mx-auto mt-10' />

        <div className='absolute z-[-1] h-full w-[110.903vw] max-w-[1440px] bg-[url(/illustrations/home/PNG/VDAO-home-hero.png)] bg-contain bg-top bg-no-repeat max-[1400px]:left-[-4.583vw] max-[1400px]:bg-cover  md:top-[50px] lg:top-[-30px]'></div>
      </main>
    </Section>
  )
}
