import Rating from '@/app/utils/Rating'
import Image from 'next/image'
import React from 'react'

type Props = {
    item:any
}

const ReviewsCard = ({item}: Props) => {
  return (
    <div className='w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-[0.20] border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] '>
        <div className="flex w-full">
            <Image 
                src={item.avatar}
                alt='avatar'
                width={50}
                height={50}
                className='w-[50px] h-[50px] rounded-full object-cover'
            />
            <div className="md:flex justify-between w-full hidden">
                <div className="pl-4">
                    <h5 className="text-[20px] text-black dark:text-white">
                        {item.name}
                    </h5>
                    <h6 className="text-[16px] text-[#000] dark:text-[#ffffffab]">
                        {item.profession}
                    </h6>
                </div>
                <Rating rating={5} />
            </div>

            {/* for mobile screen */}
            <div className="md:hidden justify-between w-full flex flex-col ">
                <div className="pl-4">
                    <h5 className="text-[20px] text-black dark:text-white ">
                        {item.name}
                    </h5>
                    <h6 className="text-[16px] text-[#000] dark:text-[#ffffffab] ">
                        {item.professtion}
                    </h6>
                </div>
                <Rating rating={5} />
            </div>
        </div>

        <p className="pt-2 px-2 font-poppins text-black dark:text-white">
            {item.comment}
        </p>
        
    </div>
  )
}

export default ReviewsCard