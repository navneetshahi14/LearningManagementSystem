const express = require('express')
const AdminRouter = express.Router()
const AdminController = require('../Controller/AdminController')
const {protect,authorizeRoles} = require('../middleware/authmiddleware')

AdminRouter.post("/categoryCreation",protect,authorizeRoles('admin'),AdminController.categoryCreation)
AdminRouter.post('/categoryDeletion',protect,authorizeRoles('admin'),AdminController.categoryDeletion)

AdminRouter.post('/deleteReview',protect,authorizeRoles('admin'),AdminController.deleteReview)





module.exports = AdminRouter