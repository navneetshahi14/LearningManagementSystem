require('dotenv').config()
import { Request,Response,NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import Errorhandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { redis } from "../utils/redis";


export const isAuthenticated = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    
    const access_token = req.cookies.access_token
    // console.log(access_token)

    if(!access_token){
        return next(new Errorhandler("Please Login to access this resource",400))
    }

    const decoded = jwt.verify(access_token,process.env.ACCESS_TOKEN as string) as JwtPayload & { id: string }

    if(!decoded.id){
        return next(new Errorhandler("Access token is not valid",400))
    }

    const user = await redis.get(decoded.id as string) 

    if(!user){
        return next(new Errorhandler("user not found",400))
    }

    req.user = JSON.parse(user)
    next()
})

// validate user

export const authorizeRoles = (...roles:string[]) => {
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!roles.includes(req.user?.role || '')){
            return next(new Errorhandler(`Roles:${req.user?.role} is not allowed to access this resource`,403))
        }
        next()
    }
}