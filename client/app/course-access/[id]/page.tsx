'use client'
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/feature/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import CourseContents from '../../components/Course/CourseContents'

type Props = {
    params:any
}

const page = ({params}:  { params: Promise<{ id: string }> }) => {
    const {id} = React.use(params)
    const {isLoading,error,data} = useLoadUserQuery(undefined,{})

    useEffect(()=>{
        if(data){
            const isPurchased = data.user.courses.find((item:any)=> item.courseId === id)

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

export default page