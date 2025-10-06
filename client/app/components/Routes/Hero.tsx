/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetHerodataQuery } from '@/redux/feature/layout/layout'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { BiSearch } from 'react-icons/bi'

type Props = {}

const Hero: FC<Props> = (props) => {
  const {data,refetch} = useGetHerodataQuery("Banner",{})
  console.log(data)
  return (
    <>
      <div className="w-full md:flex items-center dark:bg-[#333] ">
        <div className="absolute top-[100px] lg:top-[82px] 2xl:h-[700px] 2xl:w-[700px] lg:h-[500px] lg:w-[500px] h-[40vh] w-[40vw] hero_animation rounded-full flex items-center lg:ml-15 lg:mt-5 "></div>
        <div className="lg:w-[40%] flex lg:min-h-screen items-center justify-end pt-[70px] lg:pt-[0] z-10 ">
          <Image src={data?.layout?.banner?.image?.url} width={400} height={400} alt="hello" className='object-contain lg:max-w-[90%] w-[90%] 2xl:max-w-[85%] h-[auto] z-[10] ' />
        </div>

        <div className="xl:w-[60%] flex flex-col items-center lg:mt-[0px] text-center lg:text-left mt-[150px] ">
          <h2 className="dark:text-white text-[#000000c7] text-[15px] px-3  w-full lg:text-[70px] font-[600] font-yatra py-2 lg:leading-none ">
            {
              data?.layout?.banner?.title
            }
          </h2>
          <br />
          <p className="dark:text-[#edfff4] text-[#000000c7] font-yatra font-[600] text-[18px] 2xl:!w-[55%] lg:!w-[78%]  ">
            {
              data?.layout?.banner?.subTitle
            }
          </p>
          <br />
          <br />
          <div className="xl:w-[55%] lg:w-[70%] w-[90%] h-[50px] bg-transparent relative ">
            <input type="search" placeholder='Search Courses.....' className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-poppins " />
            <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] ">
              <BiSearch size={20} className='cursor-pointer'  />
            </div>
          </div>
          
            <br />
            <br />
            <div className="2xl:w-[55%] lg:w-[85%] w-[90%] flex items-center ">
              <Image 
                src={require("@/public/user.png")}
                alt='hello'
                className='h-[30px] w-[30px] rounded-full  '
              />
              <Image 
                src={require("@/public/user.png")}
                alt='hello'
                className='h-[30px] w-[30px] rounded-full ml-[-15px] '
              />
              <Image 
                src={require("@/public/user.png")}
                alt='hello'
                className='h-[30px] w-[30px] rounded-full ml-[-15px] '
              />
              <p className="font-yatra dark:text-[#edfff4] text-[#000000b3] lg:pl-2 text-[18px] font-[600]  ">
                500K+ People already trusted us.{" "}
                <Link href={'/courses'} className='dark:text-[#46e254] text-[crimson] ' >
                  View Courses                
                </Link>{" "}
              </p>
            </div>
            <br />
        </div>

      </div>
    </>
  )
}

export default Hero