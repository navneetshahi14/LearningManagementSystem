/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import React from 'react'
import avatarDefault from '../../../public/user.png'
import { RiLockPasswordLine } from 'react-icons/ri'
import { SiCoursera } from 'react-icons/si'
import { AiOutlineLogout } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import Link from 'next/link'

type Props = {
    user: any
    active: number
    avatar: string | null
    setActive: (active: number) => void
    logoutHandler: any
}

const SideBarProfile: React.FC<Props> = ({ user, active, avatar, setActive, logoutHandler }) => {
    return (
        <div className='w-full'>
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                onClick={() => setActive(1)}
            >
                <Image
                    src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
                    alt=""
                    width={30}
                    height={30}
                    className='w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full '
                />
                <h5
                    className='pl-2 md:block hidden font-poppins dark:text-white text-black'
                >
                    My Account
                </h5>
            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={20} className='dark:text-white text-black' />
                <h5 className='pl-2 md:block hidden font-poppins dark:text-white text-black'
                >Change password</h5>
            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                onClick={() => setActive(3)}
            >
                <SiCoursera size={20} className='dark:text-white text-black' />
                <h5 className='pl-2 md:block hidden font-poppins dark:text-white text-black'
                >Enrolled Courses</h5>
            </div>
            {
                user.role === "admin" && (
                    <Link className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                        href={'/admin'}
                    >
                        <MdOutlineAdminPanelSettings size={20} className='dark:text-white text-black'  />
                        <h5 className='pl-2 md:block hidden font-poppins dark:text-white text-black'
                        >Admin DashBoard</h5>
                    </Link>
                )
            }
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                onClick={() => logoutHandler()}
            >
                <AiOutlineLogout size={20} className='dark:text-white text-black' />
                <h5 className='pl-2 md:block hidden font-poppins dark:text-white text-black'
                >Log Out</h5>
            </div>
        </div>
    )
}

export default SideBarProfile