import React from 'react'
import CourseDetailsPage from '../../components/Course/CourseDetailsPage'

const page = ({ params }: { params: Promise<{ id: string }> }) => {

  const {id} = React.use(params)

  return (
    <div className='dark:bg-gradient-to-b dark:from-gray-900 dark:to-black'>
        <CourseDetailsPage id={id} />
    </div>
  )
}

export default page