// 'use client' === 'use badshah'
'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import CourseBanner from '../main/molecule/CourseBanner'
import { useRouter } from 'next/navigation'

const CourseSection = () => {
    const router = useRouter()
  return (
    <>
        <div className="h-full w-full flex flex-col items-center ">
            <div className="flex items-center shadow-md z-[2] justify-between p-1 w-[100%] px-2 pt-3">
                <h1 className='uppercase text-xl font-semibold '>Courses</h1>
                <Button onClick={()=>router.push(`/instructor/createCourse/Newcourse`)} className='rounded shadow bg-blue-500 text-white hover:bg-blue-800 text-xl ' ><Plus/> New Course</Button>
            </div>

            <div className="h-[90%] w-[100%] flex flex-col gap-2 bg-red-50 p-2 overflow-y-auto overflow-x-hidden ">
                <CourseBanner />
                <CourseBanner />
                <CourseBanner />
                <CourseBanner />
            </div>

        </div>
    </>
  )
}

export default CourseSection