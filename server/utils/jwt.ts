require('dotenv').config()
import { Response } from "express"
import { IUser } from '../model/user.model'
import { redis } from './redis'


interface ITokenOption {
    expires: Date
    maxAge: number
    httpOnly: boolean
    sameSite: 'lax' | 'strict' | "none" | undefined
    secure: boolean
}

export const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10)
export const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10)


export const accessTokenOption: ITokenOption = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: false
}

export const RefreshTokenOption: ITokenOption = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: false
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken()
    const refreshToken = user.SignRefreshToken()

    redis.set(user._id,JSON.stringify(user) as any)

    if (process.env.NODE_ENV === 'production') {
        accessTokenOption.secure = true
    }


    res.cookie("access_token", accessToken, accessTokenOption)
    res.cookie("refresh_token", refreshToken, RefreshTokenOption)

    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    })
}