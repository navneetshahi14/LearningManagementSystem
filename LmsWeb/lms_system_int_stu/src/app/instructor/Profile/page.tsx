import NavbarIn from '@/app/_components/Instructor/NavbarIn'
import Profiledash from '@/app/_components/Instructor/Profiledash'
import React from 'react'

const ProfilePage = () => {
  return (
    <>
        <div className="h-screen w-full flex overflow-hidden">
            <div className="h-[100%] w-[20vw] ">
                <NavbarIn />
            </div>
            <div className="h-[100%] w-[80vw] ">
                <Profiledash />
            </div>
        </div>
    </>
  )
}

export default ProfilePage