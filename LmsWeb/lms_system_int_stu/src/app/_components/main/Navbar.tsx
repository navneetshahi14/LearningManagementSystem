'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { Input } from 'postcss'
import React from 'react'

const Navbar = () => {

  const router = useRouter()

  return (
    <>
        <nav className="h-[10vh] w-full shadow-xl flex justify-center items-center gap-10">
            <h1 className='text-2xl font-bold uppercase'>ElevateX</h1>
            {/* <p className="ml-10 text-sm text-[#999] font-semibold cursor-pointer">Explore</p> */}
            <div className="flex border-[1px] rounded-full py-1 px-5 cursor-pointer w-[30%] mx-16 justify-center items-center">
                <Search />
                <Input className='outline-none border-0' type='text' id='search' placeholder='Search Here......' />
            </div>
            <div className=" gap-10 flex">
                <Button onClick={()=>router.replace('/auth/login')} className='border border-blue-700 rounded text-blue-700 text-lg font-semibold hover:bg-gray-200 shadow-md'>Log in</Button>
                <Button onClick={()=>router.replace('/auth/register')} className=' rounded text-white bg-blue-700 text-lg font-semibold hover:bg-blue-800 shadow-md'>Sign up</Button>
            </div>
        </nav>
    </>
  )
}

export default Navbar