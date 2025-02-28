'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import Dashshow from '../main/molecule/Dashshow'

const DashBoard = () => {

    const router = useRouter()

  return (
    <>
        <div className="h-[100%] w-[100%] p-5 overflow-hidden flex items-center justify-center gap-3 flex-wrap ">
            <div className="flex  w-[100%] h-[60%] items-center justify-center gap-10 ">
                <div className="h-[98%] w-[60%] flex items-center justify-center overflow-hidden bg-gray-50 shadow rounded-2xl ">
                    <Image src={'/nature.jpg'} alt={'nature'} height={1000} width={1000} />
                    {/* <h1 onClick={()=>router.push('/instructor/createCourse')} className="text-3xl font-semibold text-[#555] ">Please One Course</h1> */}
                </div>
                <div onClick={()=>router.push('/instructor/chats')} className='h-[98%] w-[40%] overflow-y-auto overflow-x-hidden p-2 py-3 bg-gray-50 shadow rounded-2xl'>
                    <h1 className='text-lg font-bold uppercase'>Replies</h1>
                        {
                            [1,2,3,4,5,6].map((k,index)=>{
                                return(
                                <div key={index} className="border-y-[1px] cursor-pointer  border-[#555] py-2 text-sm">
                                    <p>User</p>
                                    <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, alias.</p>
                                </div>
                                )
                            })
                        }
                    
                </div>
            </div>
            <div className="h-[40%] w-[100%] bg-gray-50 shadow rounded-2xl flex justify-center items-center overflow-hidden">
                <Dashshow heading={'Total income'} para={'$300'} classes='border-r-[1px]' />
                <Dashshow heading='total Course' para='5' classes='border-r-[1px]' />
                <Dashshow heading='total student' para='10' classes='border-r-[0px]' />
            </div>
        </div>
    </>
  )
}

export default DashBoard