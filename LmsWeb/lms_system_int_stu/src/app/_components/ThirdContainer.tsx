import { GraduationCap } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ThirdContainer = () => {

    const folder = [
        {
            heading:"Browse",
            body:"Browse through extensive database of courses"
        },
        {
            heading:"Category",
            body:"Browse through wide variety of courses of different Category"
        },
        {
            heading:"Mentor",
            body:"Choice Between different Mentor of your Choice"
        },
        {
            heading:"Price",
            body:"The Most Reasonable price over all other platforms"
        }
    ]

  return (
    <>
        <div className="h-screen w-full bg-white">
            <div className="flex h-[20vh] w-full justify-between items-center px-10">
                <p className="text-sm pl-2 border-l-4 border-blue-500 text-[#444]">How It Works</p>
                <h1 className="text-5xl flex-wrap font-bold text-[#444] uppercase ">Simple Steps to UpSkills</h1>
                <p className=''><GraduationCap size={40} /></p>
            </div>
            <div className="min-h-[80vh] overflow-hidden w-full flex flex-wrap items-center justify-center">
                {
                    folder.map((fol,index) => (
                        <div key={index} className="h-[40vh] w-[25vw] m-2 mx-5 flex justify-center items-center relative">
                            <Image src={'/folder.png'} alt='folder' className='shadow-xl' height={300} width={300} />
                            <div className="absolute px-10 flex flex-col gap-2 justify-center">
                                <h1 className="text-3xl uppercase font-bold">{fol.heading}</h1>
                                <p className="">{fol.body}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default ThirdContainer