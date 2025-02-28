'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface BackbtnProp {
    topic:string
}

const BackButton:React.FC<BackbtnProp> = ({topic}) => {
    const router = useRouter()
  return (
    <>
        <div className="h-[8vh] w-[100%] bg-green-50 flex items-center px-5">
          <ArrowLeft onClick={()=>router.back()} />
          <h1 className="text-lg pl-10 font-semibold uppercase">{topic}</h1>
        </div>
    </>
  )
}

export default BackButton