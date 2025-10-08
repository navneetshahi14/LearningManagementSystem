import { NextFunction,Response,Request } from "express";
import Errorhandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import LayoutModel from "../model/layout.model";
import cloudinary from 'cloudinary'
// import { title } from "process";

export const createLayout = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {

        const {type} = req.body

        const isTypeExist = await LayoutModel.findOne({type})

        if(isTypeExist){
            return next(new Errorhandler(`${type} already exist`,400))
        }

        if(type === 'Banner'){
            const {image,title,subTitle} = req.body
            const myCloud = await cloudinary.v2.uploader.upload(image,{
                folder:"layout"
            })
            const banner ={
                type:"Banner",
                banner:{
                    image:{
                        public_id:myCloud.public_id,
                        url:myCloud.secure_url
                    },
                    title,
                    subTitle
                },
            }
            const data = await LayoutModel.create(banner)
        }

        if(type === 'FAQ'){
            const {faqdata} = req.body
            const FaqItems = await Promise.all(
                faqdata.map(async(item:any)=>{
                    return {
                        question: item.question,
                        answer: item.answer
                    }
                })
            )
            await LayoutModel.create({type:"FAQ",faq:FaqItems})
        }

        if(type === "Categories"){
            const {categories} = req.body
            const categoriesItems = await Promise.all(
                categories.map(async(item:any)=>{
                    return {
                        title:item.title
                    }
                })
            )
            await LayoutModel.create({type:"Categories",categories:categoriesItems})
        }

        res.status(200).json({
            success:true,
            message:"Successfully created"
        })
    } catch (error:any) {
        console.log(error.message)
        return next(new Errorhandler(error.message,500))
    }
})

export const editLayout = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {type} = req.body

        if(type === 'Banner'){
            const bannarData:any = await LayoutModel.findOne({type:"Banner"})
            const {image,title,subTitle} = req.body
            
            const data = image.startsWith('https')
                ? bannarData : await cloudinary.v2.uploader.upload(image,{
                    folder:"layout"
                })
            
            if(bannarData){
                await cloudinary.v2.uploader.destroy(bannarData?.image.public_id)
            }

            const myCloud = await cloudinary.v2.uploader.upload(image,{
                folder:"layout"
            })

            const banner ={
                type:"Banner",
                image:{
                    public_id:image.startsWith('https') ? bannarData.banner.image.public_id : data?.public_id,
                    url:image.startsWith('https') ? bannarData.banner.image.url : data?.secure_url
                },
                title,
                subTitle
            }
            await LayoutModel.findByIdAndUpdate(bannarData._id,{banner})
        }

        if(type === 'FAQ'){
            const {faqdata} = req.body
            const faqitem = await LayoutModel.findOne({type:"FAQ"})
            const FaqItems = await Promise.all(
                faqdata.map(async(item:any)=>{
                    return {
                        question: item.question,
                        answer: item.answer
                    }
                })
            )
            await LayoutModel.findByIdAndUpdate(faqitem?._id,{type:"FAQ",faq:FaqItems})
        }

        if(type === "Categories"){
            const {categories} = req.body
            const categoryItem = await LayoutModel.findOne({type:"Categories"})
            const categoriesItems = await Promise.all(
                categories.map(async(item:any)=>{
                    return {
                        title:item.title
                    }
                })
            )
            await LayoutModel.findByIdAndUpdate(categoryItem?._id,{type:"Categories",categories:categoriesItems})
        }

        res.status(200).json({
            success:true,
            message:"Successfully Updated"
        })

    }catch(err:any){
        return next(new Errorhandler(err.message,500))
    }
})

export const getLayout = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {type} = req.params

        const layout = await LayoutModel.findOne({type})

        res.status(200).json({
            success:true,
            layout
        })

    }catch(err:any){
        return next(new Errorhandler(err.message,500))
    }
})