import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const LessonCard = () => {

    const router = useRouter() 

  return (
    <>
        <div onClick={()=>router.replace('/video/1')} className="h-[20vh] cursor-pointer w-full mx-1 my-2 bg-gray-200 flex items-center px-3 gap-2 rounded-[1rem] shadow-md">
            <Image src={'/nature.jpg'} className='rounded-[0.7rem] drop-shadow-md'  alt='nature' height={150} width={150} />
            <div className="flex flex-col justify-between gap-5 ml-3">
                <h1 className="text-xl font-semibold">Title</h1>
                <p className="text-sm font-normal">Lorem, ipsum Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, eaque!</p>
            </div>
        </div>
    </>
  )
}

export default LessonCard