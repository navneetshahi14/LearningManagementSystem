const express = require('express')
const authRouter = express.Router()
const AuthController = require("../Controller/AuthController")


authRouter.post('/register',AuthController.UserRegister)
authRouter.post('/login',AuthController.UserLogin)



module.exports = authRouter