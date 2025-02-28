import Image from 'next/image'
import React from 'react'

const LessonCart = () => {
  return (
    <>
        <div className="flex items-center gap-5 my-5 p-1 bg-[#55555569] rounded-[10px]">
            <Image src={'/nature.jpg'} alt='nature' className='rounded-[5px]' width={100} height={100} />
            <h1>Title</h1>
        </div>
    </>
  )
}

export default LessonCart