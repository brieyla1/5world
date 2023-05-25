import DarkButton from '~/styles/shared/buttons/darkButton'

const MailingListComponent = () => {
  const containerClass = 'flex px-6 py-14 flex-col'
  return (
    <div className={`bg-vdao-lightpurple`}>
      <div className={`mx-auto max-w-[1280px] bg-vdao-lightpurple px-6 py-14 md:flex-row md:py-24`}>
        <div className='flex-1'>
          <div className='w-[198px] font-heading text-[32px] font-medium leading-[38px] md:mx-auto md:w-11/12  md:text-[46px]'>
            Join Our Mailing List
          </div>
        </div>

        <div className='justify-center md:flex md:pt-[35px]'>
          <div className='pt-8 font-body text-[22px] font-medium leading-[26px] md:w-4/12  md:pt-0  md:text-[26px] md:leading-[30px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis mi.
          </div>

          <div className='flex flex-col justify-end pt-8 md:ml-[8.3%] md:w-6/12 md:flex-row md:pt-0'>
            <input
              placeholder='Enter your email'
              className='h-10 w-full rounded-[5px] pl-5 text-vdao-dark outline-none outline-vdao-dark placeholder:text-vdao-dark placeholder:opacity-50'
            />
            <DarkButton text='Subscribe' className='clash mt-[22px] md:mt-0 md:ml-5' />
          </div>
        </div>
      </div>
      {/* <div className="hidden">
        <div className="font-heading text-5xl font-medium">
          Join Our Mailing List
        </div>
        <div className="pt-8 pr-32 text-2xl font-normal md:pt-9">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi turpis
          mi.
        </div>
        <div
          className={`${containerClass} mx-auto max-w-[1280px] bg-vdao-lightpurple md:flex-row md:py-24`}
        >
          <div className="flex flex-1 flex-col justify-end pt-8 md:flex-row md:pt-24">
            <input
              placeholder="Enter your email"
              className="h-10 w-full rounded-md pl-5 text-vdao-dark outline-none outline-vdao-dark placeholder:text-vdao-dark placeholder:opacity-50"
            />
            <DarkButton
              text="Subscribe"
              className="mt-6 h-10 py-2 font-heading md:mt-0 md:ml-5"
            />
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default MailingListComponent
