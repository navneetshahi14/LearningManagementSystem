/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import AllUsers from '@/app/components/Admin/Users/AllUsers'
import DashboardHero from '../../components/Admin/DashboardHero'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '../../hooks/adminProtected'
import Heading from '../../utils/Heading'
// import ManageTeams from '../../components/Admin/Team/ManageTeams'
import React from 'react'

type Props = unknown

const page = (props: Props) => {
  return (
    <div className='min-h-screen h-auto'>
            <AdminProtected >
            <Heading 
                title='ElevateX---Admin'
                description='ElevateX is a plateform for students to learn and get help from teachers'
                keyword='Programming,Mern,Redux,Machine Learning'
            />
            <div className="flex min-h-screen dark:bg-slate-900 bg-white dark:text-white text-black h-auto ">
                <div className="2xl:w-[16%] w-1/5 ">
                    <AdminSidebar />
                </div>
                <div className="w-[80%] ">
                    <DashboardHero />
                    <AllUsers isTeam={true} />
                </div>
            </div>
            </AdminProtected>
        </div>
  )
}

export default page