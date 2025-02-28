const express = require('express')
const CommonRoutes = express.Router()
const CommonController = require('../Controller/CommonController')
const AdminController = require('../Controller/AdminController')
const { protect } = require('../middleware/authmiddleware')

CommonRoutes.get('/users',protect,AdminController.AllUser)

CommonRoutes.get('/getCourse',CommonController.getCourse)
CommonRoutes.get('/course/:id',CommonController.getCourseById)

CommonRoutes.get('/courseByTag?tag',CommonController.CourseSearchByTag)

CommonRoutes.get('/CategoryAccess',CommonController.CategoryAccess)

CommonRoutes.get('/getReview/:courseId',CommonController.getReviews)

CommonRoutes.get('/:filename',CommonController.streamVideo)


module.exports = CommonRoutes