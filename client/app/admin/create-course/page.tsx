/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'
import Heading from '../../../app/utils/Heading'
import AdminSidebar from '../../../app/components/Admin/Sidebar/AdminSidebar'
import CreateCourse from '../../../app/components/Admin/CreateCourse'

type Props = {}

const page = (props: Props) => {
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
                    <CreateCourse />
                </div>
            </div>
        </div>
    </>
  )
}

export default page