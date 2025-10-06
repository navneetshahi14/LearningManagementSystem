import { NextFunction,Request,Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import Errorhandler from "../utils/ErrorHandler";
import OrderModel ,{IOrder} from "../model/order.model";
import userModel from "../model/user.model";
import CourseModel from "../model/course.model";
import path from "path";
import ejs from 'ejs';
import sendMail from "../utils/sendMail";
import NotificationModel from "../model/notification.model";
import { getAllOrderService, newOrder } from "../services/order.service";


export const createOrder = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {courseId,payment_info} = req.body as IOrder;
        const user = await userModel.findById(req.user?._id);

        const courseExistInUser = user?.courses.some((course:any)=>course._id.toString() === courseId)

        if(courseExistInUser){
            return next(new Errorhandler("You already have purchased this course",400))
        }

        const course = await CourseModel.findById(courseId)

        if(!course) return next(new Errorhandler("Course not found",404))

        const data:any = {
            courseId:course._id,
            userId:user?._id
        }
        

        const mailData = {
            order:{
                _id:course._id.toString().slice(0,6),
                name:course.name,
                price:course.price,
                date:new Date().toLocaleDateString("en-US",{year:"numeric",month:'long',day:'numeric'}),
            }
        }

        const html = await ejs.renderFile(path.join(__dirname,'../mails/order-confirmation.ejs'),{order:mailData})

        try{
            if(user){
                await sendMail({
                    email:user.email,
                    subject:"Order Confirmation",
                    template:"order-confirmation",
                    data:mailData
                })
            }
        }catch(err:any){
            return next(new Errorhandler(err.message,400))
        }

        user?.courses.push({courseId:course?._id})

        await user?.save()

        await NotificationModel.create({
            user:user?._id,
            title:"New order",
            message:`You have a new order from ${course?.name}`
        })

        course.purchased ? course.purchased += 1 : course.purchased

        await course.save()

        newOrder(data,res,next)        

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})


export const getAllOrder = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {

        getAllOrderService(res)
        
    } catch (err:any) {
        return next(new Errorhandler(err.message,400))
    }
})
