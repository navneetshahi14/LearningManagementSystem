// 'use client'
import BackButton from '@/app/_components/BackButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { ArrowLeft } from 'lucide-react'
// import { useRouter } from 'next/navigation'
import React from 'react'

const AddLesson = () => {

  // const router = useRouter()

  return (
    <>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <BackButton topic='Add lesson' />

        <div className="w-[100%] flex flex-col items-center gap-y-10 pt-6 ">
          <div className="w-[80%]">
            <Label>Title</Label>
            <Input placeholder='Title here ....' />
          </div>
          <div className="w-[80%]">
            <Label>Description</Label>
            <Input placeholder='Description here ....' />
          </div>
          <div className="w-[80%]">
            <Label>Video</Label>
            <Input type='file' />
          </div>
          <Button className='bg-blue-500 hover:bg-blue-800 text-white rounded shadow w-[50%] text-lg'>Add lesson</Button>
        </div>
      </div>
    </>
  )
}

export default AddLesson