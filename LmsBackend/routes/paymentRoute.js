const express = require('express')
const paymentRoutes = express.Router()
const paymentController = require('../Controller/PaymentController')
const { protect } = require('../middleware/authmiddleware')

paymentRoutes.post('/createOrder',protect,paymentController.createOrder)
paymentRoutes.post('/verifyorder',protect,paymentController.VerfiyPayment)



module.exports = paymentRoutes