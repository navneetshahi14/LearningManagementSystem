'use client'
import { Pencil, Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const CourseBanner = () => {

  const router = useRouter()

  return (
    <>
      <div className="bg-gray-200 shadow h-auto w-[100%] flex flex-col">
        <div className="flex shadow z-[1] items-center p-2 gap-10">
          <Image src={'/nature.jpg'} alt='nature' height={100} width={100} />
          <p className="text-xl">Title</p>
        </div>
        <div className='w-[100%] p-2 bg-white flex items-center justify-around overflow-hidden '>
            <div onClick={()=>{router.push(`/instructor/createCourse/AddLesson/2`)}} className="flex flex-col items-center justify-center gap-y-2">
              <Plus />
              <p className="font-semibold text-[#555]">Add Lesson</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-2">
              <Trash />
              <p className="font-semibold text-[#555]">Delete</p>
            </div>
            <div onClick={()=>{router.push(`/instructor/createCourse/Edit/2`)}} className="flex flex-col items-center justify-center gap-y-2">
              <Pencil />
              <p className="font-semibold text-[#555]">Edit</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default CourseBanner