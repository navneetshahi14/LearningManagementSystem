import EditCourse from '@/app/components/Admin/Course/EditCourse'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar'
import Heading from '@/app/utils/Heading'
import React from 'react'



const Page = ({params}: { params: Promise<{ id: string }> }) => {
    const {id} = React.use(params)

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
                    {/* <CreateCourse /> */}
                    <EditCourse id={id} />
                </div>
            </div>
        </div>
    </>
  )
}

export default Page