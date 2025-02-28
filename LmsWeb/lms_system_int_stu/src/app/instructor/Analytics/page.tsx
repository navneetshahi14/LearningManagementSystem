import Analysis from '@/app/_components/Instructor/Analysis'
import NavbarIn from '@/app/_components/Instructor/NavbarIn'
import React from 'react'

const Analyics = () => {
  return (
    <>
        <div className="h-screen w-full overflow-hidden flex">
            <div className="h-full w-[20vw]">
                <NavbarIn />
            </div>
            <div className="h-[100%] w-[80vw]">
                <Analysis />
            </div>
        </div>
    </>
  )
}

export default Analyics