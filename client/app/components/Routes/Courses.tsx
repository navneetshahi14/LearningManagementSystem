import { useGetUserAllCourseQuery } from '@/redux/feature/courses/courseApi'
import React, { useEffect, useState } from 'react'
import CourseCard, { CourseItem } from '../Course/CourseCard'


const Courses = () => {

    const {data} = useGetUserAllCourseQuery({})
    const [courses,setCourses] = useState<CourseItem[]>([])

    useEffect(()=>{
        setCourses(data?.course)
    },[data])


  return (
    <div>
      <div className={`w-[90%] md:w-[80%] m-auto`}>
        <h1 className="text-center font-poppins text-[25px] leading-[35px] sm:text-3xll lg:text-4xl dark:text-white md:!leading-[60px] text-[#000] font-[700] tracking-tight ">
          Expand Your Career {" "}
          <span className="text-gradient">Opportunity</span><br />
          Opportunity With Our Courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[35px] mb-12 border-0 ">
          {
            courses && 
              courses.map((item,index) => (
                <CourseCard 
                  item={item}
                  key={index}
                />
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default Courses