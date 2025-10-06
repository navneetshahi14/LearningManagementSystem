import { Response } from "express"
import userModel from "../model/user.model"
import { redis } from "../utils/redis"

export const getUserById =async (id:string,res:Response) =>{
    const userjson = await redis.get(id) as string

    if(userjson){
        const user = JSON.parse(userjson)
        res.status(201).json({
            success:true,
            user
        })
    }
    
}

export const getAllUsers = async(res:Response) =>{
    const users = await userModel.find().sort({createdAt:-1})

    res.status(201).json({
        success:true,
        users
    })
}


export const updateUserRoleService = async(res:Response,id:string,role:string)=>{
    const user = await userModel.findByIdAndUpdate(id,{role},{new:true})
    res.status(201).json({
        success:true,
        user
    })
}
