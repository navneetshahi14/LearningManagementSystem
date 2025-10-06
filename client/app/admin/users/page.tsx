/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import DashboardHero from '../../../app/components/Admin/DashboardHero'
import AdminSidebar from '../../../app/components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '../../../app/hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import AllUsers from '../../components/Admin/Users/AllUsers'
import React from 'react'

type Props = unknown

const page = (props: Props) => {
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
                    <AllUsers isTeam={false} />
                </div>
            </div>
            </AdminProtected>
        </div>
  )
}

export default page