import { NotebookPen, Pencil, Search, Trophy } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const FirstContainer = () => {
  return (
    <>
        <main className="h-[90vh] bg-white w-full flex overflow-hidden relative">
            <div className="h-[100%] w-[27.5vw] p-10">
                <h2 className="text-gray-700 font-semibold">
                    Want to Upskill this is the platform
                    <br />
                    Want to Teach this is the platform
                    <br />
                    Discover, Upskill and spread your Knowledge
                </h2>
            </div>
            <div className="h-[100%] w-[45vw] flex justify-center items-center ">
                <Image src={'/smartphone.png'} width={800} height={600} className='z-[999]' alt='Iphone' />
            </div>
            <div className="h-[100%] w-[27.5vw] flex items-end  ">
                <ul className="mb-[30vh] px-10 flex flex-col gap-2 text-lg uppercase">
                    <li className="cursor-pointer flex gap-5 items-center"><Search size={20} /> Browse</li>
                    <li className="cursor-pointer flex gap-5 items-center"><Pencil size={20} /> Enroll</li>
                    <li className="cursor-pointer flex gap-5 items-center"><Trophy size={20} /> UpSkill</li>
                    <li className="cursor-pointer flex gap-5 items-center"><NotebookPen size={20} /> Teach</li>
                </ul>
            </div>
            <div className="absolute -bottom-[20vh] text-gray-300 bg-transparent uppercase  w-full text-center text-[20vw] py-0">ElevateX</div>
        </main>
    </>
  )
}

export default FirstContainer