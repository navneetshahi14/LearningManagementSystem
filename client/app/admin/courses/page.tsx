
'use client'
import DashboardHero from '../../../app/components/Admin/DashboardHero'
import AdminSidebar from '../../../app/components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '../../../app/hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import AllCourses from '../../components/Admin/Course/AllCourse'
import React from 'react'


const Page = () => {
  return (
    <div>
            <AdminProtected >
            <Heading 
                title='ElevateX---Admin'
                description='ElevateX is a plateform for students to learn and get help from teachers'
                keyword='Programming,Mern,Redux,Machine Learning'
            />
            <div className="flex h-screen dark:bg-slate-900 bg-white dark:text-white text-black">
                <div className="2xl:w-[16%] w-1/5 ">
                    <AdminSidebar />
                </div>
                <div className="w-[80%] ">
                    <DashboardHero />
                    <AllCourses />
                </div>
            </div>
            </AdminProtected>
        </div>
  )
}

export default Page