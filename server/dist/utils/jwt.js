"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.RefreshTokenOption = exports.accessTokenOption = exports.refreshTokenExpire = exports.accessTokenExpire = void 0;
require('dotenv').config();
const redis_1 = require("./redis");
exports.accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
exports.refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);
exports.accessTokenOption = {
    expires: new Date(Date.now() + exports.accessTokenExpire * 60 * 60 * 1000),
    maxAge: exports.accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: false
};
exports.RefreshTokenOption = {
    expires: new Date(Date.now() + exports.refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: exports.refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: false
};
const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    redis_1.redis.set(user._id, JSON.stringify(user));
    if (process.env.NODE_ENV === 'production') {
        exports.accessTokenOption.secure = true;
    }
    res.cookie("access_token", accessToken, exports.accessTokenOption);
    res.cookie("refresh_token", refreshToken, exports.RefreshTokenOption);
    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    });
};
exports.sendToken = sendToken;
