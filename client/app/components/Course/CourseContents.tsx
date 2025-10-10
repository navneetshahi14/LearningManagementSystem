'use client'
import { useGetCourseContentQuery } from '@/redux/feature/courses/courseApi'
import React, { useState } from 'react'
import Loader from '../Loader/Loader'
import Heading from '@/app/utils/Heading'
import CourseContentMedia from './CourseContentMedia'
import Header from '../Header'
import CourseContentList from './CourseContentList'
import { userItem } from './CourseCard'

type Props = {
    id:string
    user:userItem
}

const CourseContents = ({id,user}: Props) => {
    const {data:contentData,isLoading,refetch} = useGetCourseContentQuery(id,{refetchOnMountOrArgChange:true} ) 
    const data = contentData?.content
    const [activeVideo,setActiveVideo] = useState(0);
    const [open,setOpen] = useState(false)
    const [route,setRoute] = useState("Login")

  return (
    <>
    {
        isLoading ? (
            <Loader />
        ): (
            <>
            <Header activeItem={1} setActiveItem={()=>{}}  open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
            <div className='w-full grid md:grid-cols-10 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-gray-200'>
                <Heading 
                    title={data[activeVideo]?.title}
                    description='Best Course'
                    keyword={data[activeVideo]?.tags}
                />
                <div className="col-span-7">
                    <CourseContentMedia 
                        data={data}
                        id = {id}
                        activeVideo = {activeVideo}
                        setActiveVideo = {setActiveVideo}
                        user={user}
                        refetch={refetch}
                        
                    />
                </div>
                <div className="hidden md:block md:col-span-3">
                    <CourseContentList 
                        setActiveVideo={setActiveVideo}
                        data={data}
                        activeVideo={activeVideo}
                    />
                </div>
            </div>
            </>
        )
    }
    </>
  )
}

export default CourseContents