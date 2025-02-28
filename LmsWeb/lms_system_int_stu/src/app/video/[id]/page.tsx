'use client'
import VideoPlayer from '@/app/_components/main/molecule/VideoPlayer'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const LessonsPlayer = () => {

  const router = useRouter()

  return (
    <>
        <div className="h-screen w-full ">
          <div className="h-[5vh] w-full p-2 shadow-lg flex items-center">
            <ArrowLeft className='cursor-pointer' onClick={()=>router.back()} />
          </div>
          <div className="h-[95vh] w-full">
            <VideoPlayer/>
          </div>
        </div>
    </>
  )
}

export default LessonsPlayer