/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '../hooks/adminProtected'
import DashboardHero from '../components/Admin/DashboardHero'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <AdminProtected >
        <Heading 
            title='ElevateX---Admin'
            description='ElevateX is a plateform for students to learn and get help from teachers'
            keyword='Programming,Mern,Redux,Machine Learning'
        />
        <div className="flex min-h-screen h-auto dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black bg-gray-200">
            <div className="2xl:w-[16%] w-1/5 ">
                <AdminSidebar />
            </div>
            <div className="w-[85%] ">
                <DashboardHero isDashboard={true} />
            </div>
        </div>
        </AdminProtected>
    </div>
  )
}

export default Page