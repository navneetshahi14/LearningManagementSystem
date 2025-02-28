
import React from 'react'
import CommentsShowcase from '../main/molecule/CommentsShowcase'

const ChatSection = () => {
  return (
    <>
        <div className="h-[100%] p-3 w-[100%] flex flex-col  justify-between items-center gap-2 ">
            <h1 className="text-4xl font-bold uppercase text-[#666]">Comments on Courses</h1>
            <div className="w-full h-[90%] gap-5 bg-gray-50 rounded-xl overflow-y-scroll overflow-x-hidden flex flex-col p-2 items-center ">
                <CommentsShowcase />
                <CommentsShowcase />
                <CommentsShowcase />
                
            </div>
        </div>
    </>
  )
}

export default ChatSection