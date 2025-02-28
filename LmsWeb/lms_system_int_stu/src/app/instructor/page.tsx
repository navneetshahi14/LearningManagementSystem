import React from 'react'
import NavbarIn from '../_components/Instructor/NavbarIn'
import DashBoard from '../_components/Instructor/DashBoard'

const Instructor = () => {
  return (
    <>
        <div className="h-screen w-full flex flex-1">
          <div className="h-screen w-[20vw] ">
            <NavbarIn />
          </div>
          <div className="h-screen w-[80vw] ">
            <DashBoard />
          </div>
        </div>
    </>
  )
}

export default Instructor