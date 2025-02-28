'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Comments from './Comments'

const CommentsShowcase = () => {

    const [showdown,setShowDown] = useState(false)

    return (
        <>
            <div className="w-[95%] flex flex-col h-auto bg-gray-100 shadow-md">
                <div onClick={()=>setShowDown(showdown?false:true)} className="w-full p-2 flex justify-between items-center pr-10">
                    <div className="flex gap-10">
                        <Image src={'/nature.jpg'} alt='nature' height={100} width={100} />
                        <p className="text-2xl font-bold uppercase">
                            Title
                        </p>
                    </div>
                    <div className="text-lg ">
                        <span className="font-semibold uppercase">Comments</span> : 1
                    </div>
                </div>
                <div className={` transition-[height] duration-1000 ${showdown?"h-auto":"h-0 overflow-hidden"}  w-[100%] flex flex-col `}>
                    
                    <Comments />
                    <Comments />
                    <Comments />
                </div>
            </div>
        </>
    )
}

export default CommentsShowcase