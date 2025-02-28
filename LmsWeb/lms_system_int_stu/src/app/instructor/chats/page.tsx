import ChatSection from '@/app/_components/Instructor/ChatSection'
import NavbarIn from '@/app/_components/Instructor/NavbarIn'
import React from 'react'

const Chats = () => {
  return (
    <>
        <div className="h-screen w-full overflow-hidden flex ">
            <div className="h-screen w-[20vw]  ">
                <NavbarIn />
            </div>
            <div className="h-screen w-[80vw]  ">
                <ChatSection />
            </div>
        </div>
    </>
  )
}

export default Chats