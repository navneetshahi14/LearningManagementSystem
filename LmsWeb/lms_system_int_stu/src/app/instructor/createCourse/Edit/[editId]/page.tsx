import BackButton from '@/app/_components/BackButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const EditCourse = () => {
    return (
        <>
            <div className="flex flex-col h-screen w-full overflow-hidden">
                <BackButton topic='Update Course' />

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
                        <Label>Price</Label>
                        <Input type='number' placeholder='Price here ....' />
                    </div>
                    <div className="w-[80%]">
                        <Label>Thumbnail</Label>
                        <Input type='file' />
                    </div>
                    <Button className='bg-blue-500 hover:bg-blue-800 text-white rounded shadow w-[50%] text-lg'>Update Course</Button>
                </div>

            </div>
        </>
    )
}

export default EditCourse