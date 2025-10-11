require('dotenv').config
import express from 'express'
export const app = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {ErrorMiddleware} from './middleware/error'
import UserRouter from './routes/user.route'
import CourseRouter from './routes/course.routes'
import OrderRouter from './routes/order.routes'
import notificationRoute from './routes/notification.routes'
import analyticsRouter from './routes/analytics.routes'
import layoutRouter from './routes/layout.routes'
import job from './config/cron'

if(process.env.NODE_ENV === "production") job.start()

app.use(express.json({limit:"50mb"}))

app.use(cookieParser())

app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}))

// routers
app.use("/api/v1",UserRouter)
app.use("/api/v1",CourseRouter)
app.use("/api/v1",OrderRouter)
app.use("/api/v1",notificationRoute)
app.use("/api/v1",analyticsRouter)
app.use("/api/v1",layoutRouter)


app.get('/',(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"API is working"
    })
})

app.all("*",(req,res,next)=>{
    const err = new Error(`Route ${req.originalUrl} not found`) as any
    err.statusCode = 404
    next(err)
})


app.use(ErrorMiddleware);