import {Request,Response,NextFunction} from 'express'
import userModel, { IUser } from '../model/user.model'
import Errorhandler from '../utils/ErrorHandler'
import { CatchAsyncError } from '../middleware/catchAsyncError'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import ejs from 'ejs'
import path from 'path'
import sendMail from '../utils/sendMail'
import { accessTokenOption, RefreshTokenOption, sendToken } from '../utils/jwt'
import { redis } from '../utils/redis'
import { getAllUsers, getUserById, updateUserRoleService } from '../services/user.service'
import cloudinary from 'cloudinary'
import CourseModel from '../model/course.model'

interface IregisterBody{
    name:string
    email:string
    password:string
    avatar?:string
}

export const registrationUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {name,email,password} = req.body
        const isEmailExist = await userModel.findOne({email})

        if(isEmailExist){
            return next(new Errorhandler("Email already exist",400))
        }

        const user:IregisterBody = {
            name,
            email,
            password
        }

        const activationToken = createActivationToken(user)


        const activationCode = activationToken.activationCode
        const data = {user:{name:user.name},activationCode}
        const html = await ejs.renderFile(path.join(__dirname,"../mails/activation-mail.ejs"),data)

        try {
            await sendMail({
                email: user.email,
                subject: "Activate your email",
                template:"activation-mail.ejs",
                data
            })

            res.status(201).json({
                success:true,
                message:`Please check your email:${user.email} to activate your account`,
                token:activationToken.token
            })
        } catch (error:any) {
            return next(new Errorhandler(error.message,400))
        }

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})

interface IActivationToken {
    token:string
    activationCode:string
}

export const createActivationToken = (user:any):IActivationToken =>{
    const activationCode = Math.floor(1000 + Math.random()*9000).toString()
    const token = jwt.sign({
        user,activationCode
    },process.env.ACTIVATION_SECRET as Secret,{
        expiresIn:"5m"
    })

    return { token,activationCode }
}

// activation user
interface IActivationRequest{
    activation_token:string
    activation_code:string
}

export const activateUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {activation_token,activation_code} = req.body as IActivationRequest

        const newUser:{user:IUser; activationCode:string} = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET as string
        ) as {user : IUser; activationCode:string}

        if(newUser.activationCode !== activation_code){
            return next(new Errorhandler("Invalid activation code",400))
        }

        const {name,email,password} = newUser.user

        const existUser = await userModel.findOne({email})

        if(existUser){
            return next(new Errorhandler("Email already exist",400))
        }

        const user = await userModel.create({
            name,
            email,
            password
        })

        res.status(200).json({
            success:true
        })

    }catch(err:any){
        console.log(err.message)
        return next(new Errorhandler(err.message,400))
    }
})


// Login Function
interface ILoginRequest{
    email:string
    password:string
}

export const LoginUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password} = req.body as ILoginRequest

        if(!email || !password){
            return next(new Errorhandler("Please fill email and password",400))
        }

        const user = await userModel.findOne({email}).select("+password")

        if(!user){
            return next(new Errorhandler("InValid email or password",400))
        }

        const isPasswordMatch = await user.comparePassword(password)

        if(!isPasswordMatch){
            return next(new Errorhandler("InValid email or password",400))
        }

        sendToken(user,200,res)

    }catch(err:any){
        return next(new Errorhandler("hello"+err.message,400))
    }
})


export const logoutUser = CatchAsyncError(async(req:Request ,res:Response, next:NextFunction)=>{
    try{

        res.cookie('access_token',"",{maxAge:1})
        res.cookie('refresh_token',"",{maxAge:1})

        const userId = req.user?._id || ""

        redis.del(userId)

        res.status(200).json({
            success:true,
            message:"Logged out successfully"
        })

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})

export const updateAccessToken = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const refresh_token = req.cookies.refresh_token as string

        const decoded = jwt.verify(refresh_token,process.env.REFRESH_TOKEN as string) as JwtPayload

        const message = "Could not refresh token"
        if(!decoded){
            return next(new Errorhandler(message,400))
        }

        const session = await redis.get(decoded.id as string)


        if(!session){
            return next(new Errorhandler('Please login for access this resources.',400))
        }

        const user = JSON.parse(session)
        const accessToken = jwt.sign({id:user._id},process.env.ACCESS_TOKEN as string,{
            expiresIn:"5m"
        })

        const refreshToken = jwt.sign({id:user._id},process.env.REFRESH_TOKEN as string,{
            expiresIn:'3d'
        })

        req.user = user

        res.cookie('access_token',accessToken,accessTokenOption)
        res.cookie('refresh_token',refreshToken,RefreshTokenOption)

        await redis.set(user._id,JSON.stringify(user),'EX',604800)

        next()

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})


export const getUserInfo = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const userId = req.user?._id || ""
        getUserById(userId,res)
    }catch(err :any){
        return next(new Errorhandler(err.message,400))
    }
})


interface ISocialAuthBody{
    email:string
    name:string
    avatar:string
}

// social auth
export const socialAuth = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {email,name,avatar} = req.body as ISocialAuthBody
        const user = await userModel.findOne({email})

        if(!user){
            const newUser = await userModel.create({email,name,avatar})
            sendToken(newUser,200,res)
        }
        else{
            sendToken(user,200,res)
        }

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})

interface IUpdateUserInfo{
    name?:string
    email?:string
}


export const updateUserInfo = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {name} = req.body as IUpdateUserInfo

        const userId = req.user?._id as string

        const user = await userModel.findById(userId)

        // if(email && user){
        //     const isEmailExist = await userModel.findOne({email})
        //     if(isEmailExist){
        //         return next(new Errorhandler("Email already exist",400))
        //     }
        //     user.email = email
        // }

        if(name && user ){
            user.name  = name
        }

        await user?.save()
        await redis.set(userId,JSON.stringify(user))

        res.status(200).json({
            success:true,
            user
        })

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})

interface IUpdatePassword{
    oldPassword:string
    newPassword:string
}

export const updatePassword = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {oldPassword,newPassword} = req.body as IUpdatePassword

        if(!oldPassword || !newPassword){
            return next(new Errorhandler("Please enter old and new password",400))
        }

        const user = await userModel.findById(req.user?._id).select("+password");

        if(user?.password === undefined){
            return next(new Errorhandler("Invalid user",400))
        }

        const isPasswordMatch = await user?.comparePassword(oldPassword)

        if(!isPasswordMatch){
            return next(new Errorhandler("Invalid Old password",400))
        }

        user.password = newPassword

        await user.save()

        await redis.set(req.user?._id as string,JSON.stringify(user))

        res.status(201).json({
            success:true,
            user
        })

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})

interface IUpdateAvatar{
    avatar:string
}

export const updateProfile = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {avatar} = req.body

        const userId = req.user?._id as string
        
        const user = await userModel.findById(userId)

        if(avatar && user){
            if(user?.avatar?.public_id){
                await cloudinary.v2.uploader.destroy(user?.avatar?.public_id)
                const mycloud = await cloudinary.v2.uploader.upload(avatar)
    
                user.avatar = {
                    public_id:mycloud.public_id,
                    url:mycloud.secure_url
                }
            }else{
                const mycloud = await cloudinary.v2.uploader.upload(avatar)
    
                user.avatar = {
                    public_id:mycloud.public_id,
                    url:mycloud.secure_url
                }
    
            }
        }

        await user?.save()

        await redis.set(userId ,JSON.stringify(user))

        res.status(200).json({
            success:true,
            user
        })

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})



export const GettingAllUsers = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        getAllUsers(res)

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})

export const updateUserRole = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {id,role} = req.body

        updateUserRoleService(res,id,role)

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})

export const deleteUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id} = req.params

        const user = await userModel.findById(id)

        if(!user){
            return next(new Errorhandler("User not found",404))
        }

        await user.deleteOne({id})

        await redis.del(id)

        res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})


export const deleteCourse = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {id} = req.params

        const course = await CourseModel.findById(id)
        if(!course) return next(new Errorhandler("Course not found.",404))

        await course.deleteOne({id})
        await redis.del(id)

        res.status(200).json({
            success:true,
            message:"Course deleted successfully"
        })

    }catch(err:any){
        return next(new Errorhandler(err.message,400))
    }
})