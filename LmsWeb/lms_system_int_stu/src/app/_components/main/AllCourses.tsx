import React from 'react'
import CourseCard from './molecule/CourseCard'
import Pagenation from './molecule/Pagenation'

const AllCourses = () => {
  return (
    <>
        <div className="w-[100%] h-auto min-h-[90vh] p-2 flex flex-col justify-between">
            <div className='w-[100%] h-auto flex flex-col gap-2'>
                <CourseCard />
            </div>
            <Pagenation />
        </div>
    </>
  )
}

export default AllCourses