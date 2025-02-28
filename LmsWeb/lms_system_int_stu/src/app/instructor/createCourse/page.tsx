import CourseSection from '@/app/_components/Instructor/CourseSection'
import NavbarIn from '@/app/_components/Instructor/NavbarIn'
import React from 'react'

const CreateCourse = () => {
  return (
    <>
      <div className="h-screen w-full overflow-hidden flex">
        <div className="h-full w-[20vw]">
          <NavbarIn />
        </div>
        <div className='h-[100%] w-[80vw]'>
          <CourseSection />
        </div>
      </div>
    </>
  )
}

export default CreateCourse