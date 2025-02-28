import React from 'react'
import Navbar from '../_components/main/Navbar'
import Filter from '../_components/main/Filter'
import AllCourses from '../_components/main/AllCourses'

const CourseShowcase = () => {
  return (
    <>
        <div className="h-screen w-full overflow-hidden">
            <Navbar />
            <div className="flex">
                <Filter />
                <div className="w-[80%] h-[90vh] overflow-y-auto overflow-x-hidden ">
                    <AllCourses />                    
                </div>
            </div>
        </div>
    </>
  )
}

export default CourseShowcase