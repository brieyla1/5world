import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import PrimaryButton from '~/styles/shared/buttons/primaryButton'
import ProfileCard from '~/components/misc/profileCard'
import { pod_type } from '~/hooks/web3/usePod'
import { useUserReads } from '~/hooks/web3/useUser'
import { Select } from 'antd'
import { useAccount } from 'wagmi'
import { useSession } from 'next-auth/react'
import { set } from 'date-fns'
import { User } from '@prisma/client'

type FormProps = {
  setNextForm?: Dispatch<SetStateAction<boolean>>
  managerAddr: string
  setManagerAddr: Dispatch<SetStateAction<string>>
  membersInfo: string[]
  setMembersInfo: any
  createPodHanlder: any
  pod?: pod_type | undefined
}

const FormTwo = ({ managerAddr, membersInfo, setManagerAddr, setMembersInfo, setNextForm, createPodHanlder, pod }: FormProps) => {
  const [removeOn, setRemoveOn] = useState(false)
  const [options, setOptions] = useState<any>([])
  // const [memberOptions, setMemberOptions] = useState<any>([])
  const [managerInfo, setManagerInfo] = useState<any>('')
  const [removeInfo, setRemoveInfo] = useState<any>([])
  const [selectedOptions, setSelectedOptions] = useState<any>([])
  const { address } = useAccount()
  const { data } = useSession()
  const [searchVal, setSearchVal] = useState<string>('')
  const { data: allUsersInfo } = useUserReads({ search: searchVal })
  console.log('allUsersInfo',  allUsersInfo, ">>", options)

  useEffect(() => {
    if (pod) {
      setManagerInfo(pod.admins ? pod.admins[0] : '')
      setMembersInfo(pod?.members)
    }
  }, [pod])

  // const handleOptions = () => {
  //   if (allUsersInfo && allUsersInfo.length > 0) {
  //     return [
  //       ...allUsersInfo.map((info: any) => ({
  //         value: info.address,
  //         label: info.name!,
  //       })),
  //       {
  //         value: address,
  //         label: data?.user?.name,
  //       },
  //     ]
  //   }
  // }
  // const handleManagerOptions = () => {
  //   const options = handleOptions()
  //   setOptions(options)
  //   if (address) {
  //     setManagerAddr(address)
  //     addManager(address, {
  //       name: data?.user?.name || '',
  //       address: address,
  //       description: data?.user?.description || '',
  //       picture: data?.user?.picture || '',
  //       role: 'MEMBER',
  //       guildId: 0,
  //       JoinedAt: new Date(),
  //       UpdatedAt: new Date(),
  //       stewardApplicationBlock: 0n,
  //       stewardApplicationDate: new Date(),
  //     })
  //   }
  // }

  // const handleMembersOptions = () => {
  //   const options = handleOptions()
  //   setMemberOptions(options)
  // }

  // useEffect(() => {
  //   handleManagerOptions()
  //   handleMembersOptions()
  // }, [allUsersInfo?.length])

  const handleChange = (value: any) => {
    if (value) {
      setManagerAddr(value)
    }
  }

  const addManager = (address: string, userOverride?: User) => {
    if (address) {
      if (userOverride) {
        setManagerInfo(userOverride)
        return
      }
      const info = allUsersInfo?.filter((info: any) => {
        return info.address === address
      })
      setManagerInfo(info[0])
    } else {
      setManagerInfo('')
    }
  }

  const handleMembers = (value: string[]) => {
    if (value) {
      setSelectedOptions(value)
    }
  }

  const addMembers = (addresses: string[]) => {
    if (addresses && addresses.length > 0) {
      setMembersInfo([])
      setRemoveInfo([])
      for (let i = 0; i < addresses.length; i++) {
        allUsersInfo?.map(info => {
          if (info.address === addresses[i]) {
            setMembersInfo((prev: any) => [...prev, info])
          }
        })
      }
    } else {
      setMembersInfo([])
    }
  }

  const removeMemberHandler = (address: string) => {
    if (address) {
      const selected = removeInfo.filter((info: any) => {
        return info.address === address
      })

      if (selected && selected.length > 0) {
        const newRemoveArr: any = []
        removeInfo.map((info: any) => {
          if (info.address !== address) {
            newRemoveArr.push(info)
          }
        })
        setRemoveInfo(newRemoveArr)
      } else {
        const info = allUsersInfo?.filter(info => {
          return info.address === address
        })
        setRemoveInfo((prev: any) => [...prev, info[0]])
      }
    }
  }
  const removeMembers = () => {
    if (removeInfo && removeInfo.length > 0) {
      for (let i = 0; i < removeInfo.length; i++) {
        setMembersInfo((current: any) => current.filter((info: any) => info.address !== removeInfo[i].address))
      }

      setRemoveOn(false)
    }
  }

  const cancelRemoveHandler = () => {
    setRemoveInfo([])
    setRemoveOn(false)
  }

  // const filteredData = data?.filter(steward => {
  //   return steward.name?.toLowerCase().includes(searchField.toLowerCase()) || steward.address.toLowerCase().includes(searchField.toLowerCase())
  // })

  // const searchFunction = (value: string) => {
  //   const result = allUsersInfo?.filter((info: any) => {
  //     console.log('newOptions name', info.address, info.name, info.name?.toLocaleLowerCase().includes(value.toLocaleLowerCase()))

  //     return info.address?.toLowerCase().includes(value.toLowerCase()) || info.name?.toLowerCase().includes(value.toLowerCase())
  //   })
  //   console.log('newOptions result', result)
  //   return result
  // }
  // const handleManageSearch = (value: string) => {
  //   console.log('newOptions value', value)
  //   if (value.length > 0) {
  //     setSearch(value)
  //     const newOptions = searchFunction(value)
  //     setOptions(newOptions)
  //   } else {
  //     handleManagerOptions()
  //   }
  // }

  // const handleMemberSearch = (value: string) => {
  //   console.log('newOptions value', value)
  //   // if (value.length > 0) {
  //     setSearch(value)
  //     // const newOptions = searchFunction(value)
  //     // console.log('newOptions newOptions', newOptions)
  //     // setMemberOptions(newOptions)
  //   // } else {
  //   //   handleMembersOptions()
  //   // }
  // }

  useEffect(() => {
    if (allUsersInfo && allUsersInfo.length > 0) {
      // const newOptions = [
      //   ...allUsersInfo.map((info: any) => ({
      //     value: info.address,
      //     label: info.name!,
      //   })),
      //   {
      //     value: address,
      //     label: data?.user?.name,
      //   },
      // ]

      const newOptions = [
        ...allUsersInfo.map((info: any) => ({
          value: info.address,
          label: info.name!,
        })),
        // ...[allUsersInfo.find((el: any) => el.value == address) ? undefined : {
        //   value: address,
        //   label: data?.user?.name,
        // }],
      ]

      setOptions(newOptions)
      if (address) {
        setManagerAddr(address)
        addManager(address, {
          name: data?.user?.name || '',
          address: address,
          description: data?.user?.description || '',
          picture: data?.user?.picture || '',
          role: 'MEMBER',
          guildId: 0,
          JoinedAt: new Date(),
          UpdatedAt: new Date(),
          stewardApplicationBlock: 0n,
          stewardApplicationDate: new Date(),
        })
      }
    }
  }, [allUsersInfo?.length, searchVal])
  // console.log('options', options, '????', 'memberOptions', memberOptions)
  {console.log("options",allUsersInfo, searchVal, options)}
  return (
    <div className='grid grid-cols-1 gap-11 pt-10 font-body text-lg font-normal text-vdao-dark md:grid-cols-2 lg:gap-[106px]'>
      <div>
        <div className='text-[22px] font-bold'>Assign Pod Manager</div>

        <div className='pb-[22px]'>Add manager address below.</div>
 
        <Select
          style={{ width: '100%' }}
          placeholder='Enter Address'
          onChange={handleChange}
          options={options}
          className='antd-stop-propagation w-full'
          value={managerAddr ? managerAddr : undefined}
          showSearch
          onSearch={val => setSearchVal(val)}
        />

        <div
          className={` ${managerAddr ? 'bg-vdao-pink' : 'border-[1px] border-vdao-pink'} mt-5 w-fit cursor-pointer rounded-[5px]  py-[5px] px-[35px] font-heading text-xl font-medium`}
          onClick={() => addManager(managerAddr)}
        >
          Add Manager
        </div>

        <div className='pt-11 text-[22px] font-bold'>Add Pod Members</div>

        <div className='pb-[22px]'>Add member address below.</div>

        {/* <input className='mt-5 h-10 w-full max-w-[424px] rounded-[10px] border-[1px] border-vdao-dark px-5 outline-none' onChange={evt => setMemberAddr(evt.target.value)} value={memberAddr} /> */}
        <Select
          mode='multiple'
          style={{ width: '100%' }}
          placeholder='Enter Address'
          onChange={handleMembers}
          options={options}
          className='antd-stop-propagation w-full'
          showSearch
          onSearch={val => {
            console.log("options serahc" , val)
            setSearchVal(val)}}
        />

        <div
          className={` ${selectedOptions?.length > 0 ? 'bg-vdao-pink' : 'border-[1px] border-vdao-pink'} mt-5 w-fit cursor-pointer rounded-[5px] py-[5px] px-[35px] font-heading text-xl font-medium`}
          onClick={() => addMembers(selectedOptions)}
        >
          Add Member
        </div>
      </div>

      <div className='md:pr-5'>
        <div className='flex justify-between'>
          <div className='text-[22px] font-bold'>Manager</div>
        </div>

        {managerInfo ? (
          <ProfileCard icon={managerInfo?.picture! ? managerInfo.picture! : ''} name={managerInfo.name ? managerInfo.name : ''} address={managerInfo.address ? managerInfo.address : ''} />
        ) : (
          'No Assigned Mangeer'
        )}

        <div className='flex justify-start gap-[30px] pt-[30px] md:pt-10'>
          <div className='text-[22px] font-bold'>Members</div>
          <div className='text-lg font-normal'>{membersInfo ? membersInfo.length : 0}</div>
          {!removeOn && (
            <div className='my-auto cursor-pointer text-sm font-bold underline' onClick={() => membersInfo?.length > 0 && setRemoveOn(true)}>
              Remove Members
            </div>
          )}
        </div>

        <div className='grid grid-cols-2 pt-5 '>
          {membersInfo
            ? membersInfo.map((member: any, idx: any) => {
                return (
                  <div className='flex' key={idx} onClick={() => removeMemberHandler(member?.address)}>
                    <ProfileCard key={idx} icon={member?.picture} name={member?.name} address={member?.address} edit={removeOn} nameLength={8} />
                  </div>
                )
              })
            : 'No Assigned Members'}
        </div>

        {removeOn && (
          <div className='flex justify-start gap-5 pt-6'>
            <div className={`w-fit cursor-pointer rounded-md bg-vdao-pink py-[5px] px-9 font-heading text-xl font-medium text-vdao-dark`} onClick={removeMembers}>
              {' '}
              Remove{' '}
            </div>

            <div className={`w-fit cursor-pointer rounded-md border-[1px] border-vdao-pink py-[5px] px-9 font-heading text-xl font-medium text-vdao-dark`} onClick={cancelRemoveHandler}>
              {' '}
              Cancel{' '}
            </div>
          </div>
        )}

        <div className='float-right flex gap-2 pt-20 pb-[30px] md:gap-5 md:pt-36 '>
          {setNextForm && (
            <div className='cursor-pointer rounded-[5px] border-[1px] border-vdao-dark py-[5px] px-[35px] font-heading text-lg font-medium' onClick={() => setNextForm(false)}>
              Previous
            </div>
          )}
          <PrimaryButton text={pod ? 'Save' : 'Confirm'} className='' onClick={() => createPodHanlder()} />
        </div>
      </div>
    </div>
  )
}

export default FormTwo
