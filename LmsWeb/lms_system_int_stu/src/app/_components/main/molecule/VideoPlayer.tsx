import React, { useState } from 'react'
// import LessonCart from './LessonCart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Commets from './Commets'
import LessonCart from './LessonCart'
import { Star, X } from 'lucide-react'


const VideoPlayer = () => {

    const [shown,setShown] = useState(false)

    
    const handleclose = () =>{
        setShown(false)
    }

  return (
    <>
        <div className='h-[100%] w-full flex overflow-hidden '>
            <div className="w-[70vw] h-[100%] gap-2 flex flex-col justify-center items-center ">
                <video controls className='h-[70vh] w-[90%] px-auto'/>
                <div className="w-[90%] flex flex-col gap-4 ">
                    <div className="w-[100%] flex items-center justify-between px-5">
                        <h1 className="text-3xl font-bold">Title</h1>
                        <Button onClick={()=>setShown(true)} className='bg-blue-600 hover:bg-blue-800 text-white text-xl rounded-xl' >Rate</Button>
                    </div>
                    <div className="w-[100%] px-5 text-sm">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, sint aliquid soluta in hic neque voluptatibus reprehenderit animi, perferendis voluptatum alias velit magnam eligendi, maiores officiis perspiciatis. Tempore, illum sunt?
                    </div>
                </div>
            </div>
            <div className="w-[30vw] h-[100%] border-l-[1px] p-2 flex flex-col  ">
                <div className="w-[100%] h-[40%] overflow-hidden">
                    <h1 className='text-lg uppercase'>Comments</h1>
                    <div className="flex w-[100%] gap-2 items-center justify-center">
                        <Input className='text-xl rounded-[0.5rem] shadow ' placeholder='Comment....'  /><Button className='bg-blue-600 hover:bg-blue-800 rounded-[0.5rem] text-lg uppercase text-white'>Comment</Button>
                    </div>
                    <div className="w-[100%] h-[70%] mt-1 overflow-y-auto overflow-x-hidden ">
                        <Commets />
                    </div>
                </div>
                <div className="w-[100%] h-[60%] ">
                    <h1 className="text-lg font-semibold uppercase">Lessons</h1>
                    <div className="w-[100%] h-[100%] p-2 overflow-y-auto overflow-x-hidden">
                        <LessonCart />
                    </div>
                </div>
            </div>
        </div>

        <div className={`reviewcover absolute ${shown?'flex':'hidden'} z-[1] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-screen w-full bg-[rgba(255,255,255,0.8)] justify-center items-center`}>
            <div className="close min-h-[50%] w-[50%] bg-white drop-shadow-lg rounded flex justify-between items-center flex-col ">
                <div className="uppercase relative p-2 text-center w-full ">
                    <span className='text-3xl font-semibold ' >Rating</span>
                    <span className='absolute right-0 pr-5' ><X className='cursor-pointer  ' onClick={handleclose} /></span>
                </div>

                <div className="w-full h-[90%] flex justify-center items-center ">
                    <Star color='yellow' fill='yellow' size={50} />
                    <Star color='yellow' fill='yellow' size={50} />
                    <Star color='yellow' fill='yellow' size={50} />
                    <Star color='yellow' fill='yellow' size={50} />
                    <Star color='yellow' fill='white' size={50} />
                </div>

                <Button className='bg-blue-600 hover:bg-blue-800 text-white hover:text-[#999] text-xl mb-5 rounded font-semibold '>Submit</Button>
            </div>
        </div>
    
    </>
  )
}

export default VideoPlayer