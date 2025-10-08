import { Response } from "express";
import CourseModel from "../model/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";

export const CreateCourse = CatchAsyncError(async(data:any,res:Response)=>{
    const course = await CourseModel.create(data)
    res.status(201).json({
        success:true,
        course
    })
})


export const getAllCourseService = async(res:Response) =>{
    const course = await CourseModel.find().sort({createdAt:-1})

    return course
}