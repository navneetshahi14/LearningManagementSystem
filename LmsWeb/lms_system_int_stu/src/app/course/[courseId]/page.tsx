'use client'
import ContentPart from '@/app/_components/main/molecule/ContentPart'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const CoursePage = () => {

  const router = useRouter()

  return (
    <>
        <div className="h-screen w-full flex flex-col overflow-hidden">
          <div className="w-full h-[5vh] shadow-lg shadow-white flex items-center pl-10 rounded-b">
            <ArrowLeft onClick={()=>router.back()} className='rounded-[0.5vh] shadow cursor-pointer border' />
          </div>
          <div className="flex bg-[#f0f0f0] ">
            <div className="w-[30vw] h-[95vh] flex flex-col border-r-[1px] border-[#555] items-center justify-between py-5 ">
              <Image src={'/nature.jpg'} alt='nature' className='rounded drop-shadow-lg' width={350} height={350} />
              <Button className='w-[70%] uppercase rounded-xl hover:bg-blue-900 font-semibold bg-blue-600 text-white text-lg '>Enroll Now</Button>
            </div>                  
            <div className="w-[70vw] h-[95vh] ">
              <ContentPart />
            </div>               
          </div>
        </div>
    </>
  )
}

export default CoursePage