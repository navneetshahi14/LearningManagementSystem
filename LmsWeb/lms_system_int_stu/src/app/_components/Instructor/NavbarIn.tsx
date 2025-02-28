'use client'
import { Button } from '@/components/ui/button'
import { ChartLine, FolderKanban, LayoutPanelLeft, MessageCircleMore, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const NavbarIn = () => {

  const router = useRouter()

  return (
    <>
        <div className="w-full h-screen p-2 flex justify-between flex-col py-5 border-r-[1px] border-[#999] shadow-xl">
            <h1 className="uppercase text-4xl font-bold ">
                ElevateX
            </h1>
            <ul className="px-5 flex flex-col gap-2 uppercase text-xl font-normal">
                <li onClick={()=>router.replace('/instructor/')} className="cursor-pointer flex items-center gap-2 text-[#222]  "><LayoutPanelLeft color='#555' /> DashBoard</li>
                <li onClick={()=>router.replace('/instructor/chats')} className="cursor-pointer flex items-center gap-2 text-[#222]  "><MessageCircleMore color='#555' /> Chat</li>
                <li onClick={()=>router.replace('/instructor/createCourse')} className="cursor-pointer flex items-center gap-2 text-[#222]  "><FolderKanban color='#555' /> Courses</li>
                <li onClick={()=>router.replace('/instructor/Analytics')} className="cursor-pointer flex items-center gap-2 text-[#222]  "><ChartLine color='#555' /> Analytics</li>
                <li onClick={()=>router.replace('/instructor/Profile')} className="cursor-pointer flex items-center gap-2 text-[#222]  "><User color='#555' /> Profile</li>
            </ul>
            <Button className='uppercase bg-blue-500 text-white text-xl font-bold rounded hover:bg-blue-800 '>Log Out</Button>
        </div>
    </>
  )
}

export default NavbarIn