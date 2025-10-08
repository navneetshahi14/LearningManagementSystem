import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import Errorhandler from '../utils/ErrorHandler'
import cloudinary from 'cloudinary'
import { CreateCourse, getAllCourseService } from "../services/course.service";
import CourseModel from "../model/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../model/notification.model";
import axios from "axios";



export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = req.body
        const thumbnail = data.thumbnail
        if (thumbnail) {
            const mycloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            })

            data.thumbnail = {
                public_id: mycloud.public_id,
                url: mycloud.secure_url
            }
        }
        CreateCourse(data, res, next)

    } catch (err: any) {
        return next(new Errorhandler(err.message, 400))
    }
})


export const editCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = req.body
        const thumbnail = data.thumbnail
        const courseId = req.params.id

        const courseData = await CourseModel.findById(courseId) as any;


        if (thumbnail && !thumbnail.startsWith('https')) {
            await cloudinary.v2.uploader.destroy(thumbnail.public_id)

            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            })

            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        if(thumbnail.startsWith("https")){
            data.thumbnail = {
                public_id: courseData?.thumbnail.public_id,
                url: courseData?.thumbnail.url
            }
        }


        const course = await CourseModel.findByIdAndUpdate(courseId, { $set: data }, { new: true })

        res.status(200).json({
            success: true,
            course
        })

    } catch (err: any) {
        return next(new Errorhandler(err.message, 400))
    }
})


export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {


        const courseId = req.params.id

        const isRedisExist = await redis.get(courseId)

        if (isRedisExist) {
            const course = JSON.parse(isRedisExist)

            res.status(200).json({
                success: true,
                course
            })
        } else {
            const course = await CourseModel.findById(req.params.id).select('-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links')

            await redis.set(courseId, JSON.stringify(course),'EX',604800)

            res.status(200).json({
                success: true,
                course
            })
        }



    } catch (err: any) {
        return next(new Errorhandler(err.message, 400))
    }
})


export const getAllCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        
            const course = await CourseModel.find().select('-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links')

            await redis.set("allCourses", JSON.stringify(course))

            res.status(200).json({
                success: true,
                course
            })


    } catch (err: any) {
        return next(new Errorhandler(err.message, 400))
    }
})


export const getCourseByUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses

        const courseId = req.params.id

        const courseExist = userCourseList?.find((course: any) => course._id.toString() === courseId)

        if (!courseExist) {
            return next(new Errorhandler("Your are not eligible to access this course", 400))
        }

        const course = await CourseModel.findById(courseId)

        const content = course?.courseData

        res.status(200).json({
            success: true,
            content
        })

    } catch (err: any) {
        return next(new Errorhandler(err.message, 400))
    }
})


interface IAddQuestion {
    question: string;
    courseId: string;
    contentId: string;
}

export const addQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { question, courseId, contentId }: IAddQuestion = req.body
        const course = await CourseModel.findById(courseId)

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return next(new Errorhandler("Invalid content Id", 400))
        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId))

        if (!courseContent) {
            return next(new Errorhandler("Invalid Content id", 400))
        }

        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: []
        }

        courseContent.questions.push(newQuestion)

        await NotificationModel.create({
            user:req.user?._id,
            title:"New Question Received",
            message:`You have a new question in ${courseContent?.title}`
        })

        await course?.save()

        res.status(200).json({
            success: true,
            course
        })

    } catch (err: any) {
        return next(new Errorhandler(err.message, 400))
    }
})

interface IAddAnswerData {
    answer: string
    courseId: string
    contentId: string
    questionId: string
}

export const addAnswer = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { answer, courseId, contentId, questionId }: IAddAnswerData = req.body

        const course = await CourseModel.findById(courseId)

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return next(new Errorhandler("Invalid content Id", 400))
        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId))

        if (!courseContent) {
            return next(new Errorhandler("Invalid Content id", 400))
        }

        const question = courseContent?.questions?.find((item: any) => item._id.equals(questionId))

        if (!question) {
            return next(new Errorhandler("Invalid Question id", 400))
        }

        const newAnswer: any = {
            user: req.user,
            answer,
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString()
        }

        question.questionReplies?.push(newAnswer)

        await course?.save()

        if (req.user?._id === question.user._id) {
            // notification
            await NotificationModel.create({
                user:req.user?.id,
                title:"New Question Reply Received",
                message:`You have a new question reply in ${courseContent.title}`
            })
        } else {
            const data = {
                name: question.user.name,
                title: courseContent.title
            }

            const html = await ejs.renderFile(path.join(__dirname, "../mails/question-reply.ejs"), data)
            try {
                await sendMail({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.ejs",
                    data
                })
            } catch (err: any) {
                return next(new Errorhandler(err.message, 400))
            }
        }

        res.status(200).json({
            success: true,
            course
        })

    } catch (err: any) {
        return next(new Errorhandler(err.message, 400))
    }
})

interface IReviewData {
    review: string
    courseId: string
    rating: number
    userId: string
}

export const addReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userCourseList = req.user?.courses;

        const courseId = req.params.id;

        const courseExists = userCourseList?.some((course: any) => course._id.toString() === courseId.toString())

        if (!courseExists) {
            return next(new Errorhandler("You are not eligible to access this course", 400))
        }

        const course = await CourseModel.findById(courseId)

        const { review, rating, userId } = req.body as IReviewData

        const reviewdata: any = {
            user: req.user,
            comment: review,
            rating
        }

        course?.reviews.push(reviewdata)

        let avg = 0;

        course?.reviews.forEach((rev: any) => {
            avg += rev.rating
        })

        if (course) {
            course.ratings = avg / course.reviews.length
        }

        await course?.save()

        await redis.set(courseId,JSON.stringify(course),"EX",604800)

        // const notification = {
        //     title: "New Review Received",
        //     message: `${req.user?.name} has given a review in ${course?.name}`
        // }

        // notification

        await NotificationModel.create({
            user:req.user?._id,
            title: "New Review Received",
            message: `${req.user?.name} has given a review in ${course?.name}`
        })

        res.status(200).json({
            success: true,
            course
        })

    } catch (err: any) {
        return next(new Errorhandler(err.message, 400))
    }
})


interface IAddReviewData {
    comment: string
    courseId: string
    reviewId: string
}

export const addReplyToReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { comment, courseId, reviewId } = req.body as IAddReviewData

        const course = await CourseModel.findById(courseId)

        if (!course) {
            return next(new Errorhandler("Course not found", 400))
        }

        const review = course?.reviews?.find((rev: any) => rev._id.toString() === reviewId)

        if (!review) {
            return next(new Errorhandler("Review not found", 400))
        }

        const replyData: any = {
            user: req.user,
            comment,
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString()
        }

        if(!review.commentReplies){
            review.commentReplies = []
        }

        // course.reviews.commentReplies.push(replyData)
        review.commentReplies.push(replyData)

        await course.save()
        await redis.set(courseId,JSON.stringify(course),"EX",604800)

        res.status(200).json({
            success: true,
            course
        })

    } catch (err: any) {
        return next(new Errorhandler(err.message, 400))
    }
})

export const GettingAllCourses = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        getAllCourseService(res)

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})

export const generateVideoUrl = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {videoId} = req.body

        if (!videoId) {
            return res.status(400).json({ message: "videoId is required" });
        }

        const response = await axios.post(
            `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            { ttl: 300 },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Apisecret ${process.env.VIDEOCIPHER_API_SECRET}`,
                }
            }
        );

        

        console.log(response.data)
        res.status(200).json(response.data)

    }catch(error:any){
        console.log("Error:->",error.message)
        return next(new Errorhandler(error.message,400))
    }
})