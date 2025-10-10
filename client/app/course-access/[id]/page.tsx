'use client'
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/feature/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import CourseContents from '../../components/Course/CourseContents'


const Page = ({params}:  { params: Promise<{ id: string }> }) => {
    const {id} = React.use(params)
    const {isLoading,error,data} = useLoadUserQuery(undefined,{})

    useEffect(()=>{
        if(data){
            const isPurchased = data.user.courses.find((item:{courseId:string})=> item.courseId === id)

            if(!isPurchased){
                redirect("/")
            }
            if(error){
                redirect("/")
            }
        }
    },[data,error])

    

  return (
    <>
    {
        isLoading ? (
            <Loader />
        ) : (
            <div>
                <CourseContents id={id} user={data?.user} />
            </div>
        )
    }
    </>
  )
}

export default Page