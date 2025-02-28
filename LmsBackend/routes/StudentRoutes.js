const express = require('express')
const studentRouter = express.Router()
const studentController = require('../Controller/studentController')
const {protect,authorizeRoles} = require('../middleware/authmiddleware')
const instructorController = require('../Controller/instructorController')


studentRouter.post('/track',protect,authorizeRoles('student'),studentController.trackProgress)

studentRouter.get("/stats",protect,studentController.getUserStat)

studentRouter.post('/addReview',protect,authorizeRoles('student'),studentController.AddReview)

studentRouter.post('/:id/submit',protect,authorizeRoles('student'),instructorController.submitQuiz)

module.exports = studentRouter