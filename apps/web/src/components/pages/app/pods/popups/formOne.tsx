import PodImage from 'public/illustrations/pods/podImage.svg'
import Image from 'next/image'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { encode } from 'querystring'

type FormProps = {
  setNextForm: Dispatch<SetStateAction<boolean>>
  podName: string
  setPodName: Dispatch<SetStateAction<string>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
  podImage: {
    image: string
    name: string
  }
  setPodImage: Dispatch<
    SetStateAction<{
      image: string
      name: string
    }>
  >
}

const FormOne = ({ podName, description, podImage, setPodImage, setNextForm, setPodName, setDescription }: FormProps) => {
  const [error, setError] = useState(false)
  const [preview, setPreview] = useState('')

  const nextHandler = () => {
    if (podName && description && podImage.image) {
      setNextForm(true)
    } else {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 10000)
    }
  }

  const onImageChange = (evt: any) => {
    const file = evt.target.files[0]
    const fileName = file.name
    // const objectUrl = URL.createObjectURL(file)
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      if (reader.result) {
        setPodImage({ image: reader.result.toString(), name: fileName })
      }
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <div className='grid grid-cols-1 gap-[30px] pt-[30px] pb-[14px] font-body text-lg font-normal text-vdao-dark md:max-h-[760px] md:grid-cols-2 md:pb-[34px] md:pt-10 lg:gap-[106px]'>
      <div>
        <div className='text-[22px] font-bold'>Pod Name</div>

        <div className='pt-[5px]'>You cannot change it after this step.</div>
        <input
          className={`mt-[22px] outline-none flex h-10 w-full items-center rounded-[5px] border-[1px] border-vdao-dark pl-5  font-body text-base font-normal text-vdao-dark duration-500 placeholder:text-vdao-dark placeholder:opacity-50 ${
            error && !podName ? 'border-red-600 placeholder:text-red-400' : 'border-vdao-dark'
          }`}
          placeholder={`${error && !podName ? '*Required' : 'Enter pod name'}`}
          onChange={evt => setPodName(evt.target.value)}
          value={podName}
        />

        <div className='pt-[40px] text-[22px] font-bold md:pt-[60px]'>Pod Profile Image</div>

        <div className='pt-[5px]'>Upload a profile image for your pod.</div>

        <div className='flex flex-col gap-5 pt-8 text-center align-middle  md:gap-10 lg:flex-row '>
          <div className='flex-none'>
            <Image src={podImage && podImage.image ? podImage.image : PodImage} height={180} width={180} alt='PodImage' className='mx-auto' />
          </div>
          <div className='md:my-auto'>
            <label className='mx-auto w-fit cursor-pointer rounded-[5px] bg-vdao-pink py-[5px] px-[35px] font-heading text-xl font-medium'>
              <input type='file' accept='image/*' onChange={onImageChange} className='hidden cursor-pointer pt-5' />
              Upload Image
            </label>

            {/* <div >
              Upload Image
            </div> */}
            <div className={`pt-[5px] text-sm md:pt-5 ${error && !podImage.image && 'text-red-400'}`}>
              {' '}
              {
                // error && !podImage.image
                //   ? 'Please do upload a file'
                //   :
                podImage.name ? podImage.name : 'Click above to upload/change file'
              }
            </div>
          </div>
        </div>
        {/* <input
          type='file'
          placeholder='Upload image'
          accept='image/png'
          onChange={onImageChange}
          className='cursor-pointer pt-5'
        /> */}
      </div>

      <div>
        <div className='text-[22px] font-bold'>Pod Description</div>

        <div className='pt-[5px]'>Your pod description goes here.</div>

        <textarea
          className={`mt-5 h-[373px] w-full rounded-[10px]  border-[1px] border-vdao-dark p-[30px] font-body text-base font-normal text-vdao-dark outline-none placeholder:text-vdao-dark placeholder:text-opacity-80 placeholder:opacity-50 md:max-w-[510px]
          ${error && !description ? 'border-red-600 placeholder:text-red-400' : 'border-vdao-dark'}`}
          placeholder={`${
            error && !description
              ? '*Required'
              : ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet elementum urna, in volutpat risus. Quisque nec tempus diam, sit amet luctus mi. Quisque auctor tortor ut nunc finibus, et venenatis lacus eleifend. Fusce commodo, ipsum sit amet mollis tincidunt.'
          }`}
          onChange={evt => setDescription(evt.target.value)}
          value={description}
        />

        <div className='pt-[20px] md:pt-[90px]'>
          <PrimaryButton text='Next' className='float-right' onClick={nextHandler} />
        </div>
      </div>
    </div>
  )
}

export default FormOne
