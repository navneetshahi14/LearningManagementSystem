import { NotebookPen, Pencil, Search, Trophy } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const SecondContainer = () => {
  return (
    <>
        <div className="h-screen w-full bg-[#444] overflow-hidden flex">
            <div className="h-screen w-[20vw] flex justify-center items-center">
                <ul className='flex flex-col uppercase text-[#f0f0f0] text-xl gap-3 '>
                    <li className="flex items-center cursor-pointer px-3 gap-2 border-l-4 rounded border-blue-700 "><Search size={20} /> Browse</li>
                    <li className="flex items-center cursor-pointer px-3 gap-2"><Pencil size={20} /> Enroll</li>
                    <li className="flex items-center cursor-pointer px-3 gap-2"><Trophy size={20} /> Upskill</li>
                    <li className="flex items-center cursor-pointer px-3 gap-2"><NotebookPen size={20} /> Tech</li>
                </ul>
            </div>
            <div className="h-screen w-[50vw] text-white flex flex-col gap-5 justify-center items-center ">
                <h1 className='text-7xl '>Browse Your Course</h1>
                <p className="px-20 text-sm text-gray-300 cursor-none">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut labore tenetur sequi maxime cumque ut porro asperiores, ex ducimus dignissimos architecto rem unde voluptatum alias sapiente vitae. Cupiditate architecto rem deserunt natus.
                </p>
            </div>
            <div className="h-screen w-[30vw] flex items-center justify-center ">
                <Image src={'/smartphone.png'} alt='iphone' height={600} width={800}/>
            </div>
        </div>
    </>
  )
}

export default SecondContainer