import BackButton from '@/app/_components/BackButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const NewCourse = () => {
    return (
        <>
            <div className="h-screen w-full ">
                <BackButton topic='new course' />

                <div className="flex w-[100%] h-[100%] overflow-x-hidden overflow-y-auto ">

                    <div className="w-[100%] flex flex-col items-center gap-y-5 pt-6 ">
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
                        <div className="w-[80%] flex flex-col gap-2 ">
                            <Label>Category</Label>
                            <select className='outline-0 border-0 p-1'>
                                <option>Coding</option>
                                <option>Coding</option>
                                <option>Coding</option>
                            </select>
                        </div>
                        <div className="w-[80%]">
                            <Label>Tags</Label>
                            <div className="w-[100%] h-[5vh] flex items-center border-[2px] p-2  ">
                                hello
                            </div>
                        </div>
                        <div className="w-[80%]">
                            <Label>Thumbnail</Label>
                            <Input type='file' />
                        </div>
                        <Button className='bg-blue-500 hover:bg-blue-800 text-white rounded shadow w-[50%] text-lg'>Add New Course</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default NewCourse