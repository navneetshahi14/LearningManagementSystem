/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { FC, useState } from 'react'
import SideBarProfile from './SideBarProfile'
import { useLogOutQuery } from '@/redux/feature/auth/authApi'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'
import ProfileInfo from "./ProfileInfo"
import ChangePassword from './ChangePassword'

type Props = {
    user: any

}

const Profile: FC<Props> = ({ user }) => {

    const [scroll, setScroll] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [logout, setLogout] = useState(false)
    const { } = useLogOutQuery(undefined, {
        skip: !logout ? true : false
    })
    const [active, setActive] = useState(1)

    const logoutHandler = async () => {
        setLogout(true);
        await signOut();
    }

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                setScroll(false)
            } else {
                setScroll(true)
            }
        })
    }

    return (
        <div className="w-[85%] flex mx-auto  ">
            <div className={`w-[60px] md:w-[310px] h-[450px] dark:bg-slate-900 bg-white border dark:border-[#ffffff1d] border-[#00000014] overflow-hidden rounded-[5px] shadow-xl dark:shadow-sm mt-[100px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px] `}>
                <SideBarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logoutHandler={logoutHandler}
                />
            </div>
            {
                active === 1 && (
                    <div className="w-full h-full bg-transparent  mt-[100px]">
                        <ProfileInfo avatar={avatar} user={user} />
                    </div>
                )
            }
            {
                active === 2 && (
                    <div className="w-full h-full bg-transparent  mt-[100px]">
                        <ChangePassword />
                    </div>
                )
            }
        </div>
    )
}

export default Profile