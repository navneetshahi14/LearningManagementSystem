import { Request,Response,NextFunction } from "express";
import Errorhandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { generateLast12monthsdata } from "../utils/analytics.generator";
import userModel from "../model/user.model";
import CourseModel from "../model/course.model";
import OrderModel from "../model/order.model";



export const getUserAnalytics = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const users = await generateLast12monthsdata(userModel)

        res.status(200).json({
            success:true,
            users
        })
    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})


export const getCourseAnalytics = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const course = await generateLast12monthsdata(CourseModel)

        res.status(200).json({
            success:true,
            course
        })
    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})


export const getOrderAnalytics = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const order = await generateLast12monthsdata(OrderModel)

        res.status(200).json({
            success:true,
            order
        })
    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})