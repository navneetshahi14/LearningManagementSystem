
'use client'
import React from 'react'
import Heading from '../../utils/Heading'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '../../hooks/adminProtected'
import DashboardHero from '../../components/Admin/DashboardHero'
import EditFaq from '@/app/components/Admin/Customization/EditFaq'


const Page = () => {
  return (
    <div>
        <AdminProtected >
        <Heading 
            title='ElevateX---Admin'
            description='ElevateX is a plateform for students to learn and get help from teachers'
            keyword='Programming,Mern,Redux,Machine Learning'
        />
        <div className="flex h-[200vh] dark:bg-slate-900 bg-white dark:text-white text-black">
            <div className="2xl:w-[16%] w-1/5 ">
                <AdminSidebar />
            </div>
            <div className="w-[80%] ">
                <DashboardHero />
                <EditFaq />
            </div>
        </div>
        </AdminProtected>
    </div>
  )
}

export default Page