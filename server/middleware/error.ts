import Errorhandler from "../utils/ErrorHandler";
import { NextFunction, Request, Response } from "express";

export const ErrorMiddleware = (err:any,req:Request,res:Response,next:NextFunction) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Message"

    if(err.name === 'CastError'){
        const message = `Resource not found. InValid:${err.path}`
        err = new Errorhandler(message,400)
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new Errorhandler(message,400)
    }

    if(err.name === 'JsonWebToken'){
        const message = `Json web token is invalid, try again `
        err = new Errorhandler(message,400)
    }


    if(err.name == 'TokenExpiredError'){
        const message = `Json web Token is expired, try again`
        err = new Errorhandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}