import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

const Pagenation = () => {
  return (
    <>
        <div className="w-full h-[8vh] flex items-center justify-center gap-10 bg-[#9999997a]">
          <span className='cursor-pointer border-2 rounded-full'><ArrowLeft /></span>
          <span className='cursor-pointer'>
            1    2    3    4    5
          </span>
          <span className='cursor-pointer border-2 rounded-full'><ArrowRight /></span>
        </div>
    </>
  )
}

export default Pagenation