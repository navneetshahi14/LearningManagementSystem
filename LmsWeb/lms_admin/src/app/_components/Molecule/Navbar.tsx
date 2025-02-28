import Image from 'next/image'
import React from 'react'
import Button from '../Atoms/Button'
import { ChartArea, LayoutDashboard, Notebook, Users } from 'lucide-react'

const Navbar = () => {

    const menu =[
        {
            icon:LayoutDashboard,
            text:"Dashboard"
        },
        {
            icon:Users,
            text:"Members"
        },
        {
            icon:Notebook,
            text:"Courses"
        },
        {
            icon:ChartArea ,
            text:"Analytics"
        }
    ]

  return (
    <>
        <div className="w-full h-[100%] border-r-[1px] border-[#222] overflow-hidden flex flex-col items-center justify-between py-6">
            <div className="flex items-center p-2 ">
                <h1 className="uppercase text-4xl font-semibold ">ElevateX</h1>
            </div>
            <div className="w-full px-10 text-xl">
                <ul className="text-[#333] flex flex-col gap-4">
                    {
                        menu.map((e,index)=>(
                            <li key={index} className="cursor-pointer flex items-center gap-2">{<e.icon size={20}/>} {e.text}</li>
                        ))
                    }
                </ul>
            </div>
            <div className="w-full flex flex-col items-center gap-2">
                <div className="overflow-hidden h-[80px] w-[80px] rounded-full shadow flex justify-center items-center">
                    <Image src={"/user.png"} alt={''} height={100} width={100} />
                </div>
                <h1 className="text-xl font-semibold uppercase">Navneet</h1>
                <Button content='Log out' />
            </div>
        </div>
    </>
  )
}

export default Navbar