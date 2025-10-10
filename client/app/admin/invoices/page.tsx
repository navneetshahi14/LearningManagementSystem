'use client'
import React from 'react'
import Heading from '../../utils/Heading'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar'
import AllInvoices from '@/app/components/Admin/Orders/AllInvoices'
import DashboardHero from '@/app/components/Admin/DashboardHero'


const Page = () => {
  return (
    <>
        <div className="bg-white dark:bg-slate-900 dark:text-white text-black ">
            <Heading 
                title='ElevateX---Admin'
                description='ElevateX is a plateform for students to learn and get help from teachers'
                keyword='Programming,Mern,Redux,Machine Learning'
            />
            <div className="flex">
                <div className="2xl:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>
                <div className="w-[80%]">
                    <DashboardHero />
                    <AllInvoices isDashboard={false} />
                </div>
            </div>
        </div>
    </>
  )
}

export default Page