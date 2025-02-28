'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'


const CourseCard = () => {

    const router = useRouter()

  return (
    <>
        <div onClick={()=>{router.push('/course/1')}} className="w-[100%] h-[30vh] bg-gray-200 flex items-center justify-between px-5 py-1 my-2 overflow-hidden rounded-[1rem] gap-3 shadow-lg">
            <Image src={'/nature.jpg'} className='rounded-[0.5rem]' alt='thumbnail' width={250} height={250} />
            <div className="flex flex-col">
                <h1 className="text-2xl text-wrap uppercase">Title</h1>
                <p className="text-lg text-wrap text-[#555]">Description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, aliquam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, inventore.</p>
                <p className="mt-2 flex items-center gap-2">
                   <span className='font-bold'>
                    Rating:
                   </span>
                   <span>
                    <Star color='yellow' fill='yellow' size={15} />
                   </span>
                </p>
            </div>
            <div className="text-xl h-full pt-10 font-bold">3999</div>
        </div>
    </>
  )
}

export default CourseCard