import { Star } from 'lucide-react'
import React from 'react'
import LessonCard from './LessonCard'
// import CourseCard from './CourseCard'

const ContentPart = () => {
  return (
    <>
        <div className="h-full w-full overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-2">
            <h1 className='text-4xl font-bold'>Title</h1>
            <p className="px-3 font-semibold text-[#555]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium assumenda, voluptatem quia ullam impedit suscipit neque illum, voluptatibus, perferendis facere maxime saepe quam itaque expedita! Eaque id quia distinctio exercitationem dignissimos corporis voluptatem soluta excepturi non temporibus, fugit ducimus molestias ipsa deleniti illum enim saepe nobis maiores quidem voluptatibus animi.</p>
            <div className="flex font-semibold text-xl">
                <span>Rating:</span> <span><Star fill='yellow' color='yellow' />  </span>
            </div>
            <h1 className="text-6xl font-semibold ">3999</h1>

            <div className="mt-2">
                <h1 className="text-xl font-normal uppercase underline ">Lessons</h1>
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
            </div>
        </div>
    </>
  )
}

export default ContentPart