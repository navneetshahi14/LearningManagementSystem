const express = require('express')
const instructorRoute = express.Router()
const instructorController = require('../Controller/instructorController')
const {protect,authorizeRoles} = require('../middleware/authmiddleware')


instructorRoute.post('/createCourse',protect,authorizeRoles("instructor"),instructorController.CourseCreation)
instructorRoute.post('/deleteCourse',protect,authorizeRoles("instructor"),instructorController.CourseDeletion)


instructorRoute.post('/createQuiz',protect,authorizeRoles("instructor"),instructorController.QuizCreation)
instructorRoute.post('/updateQuiz',protect,authorizeRoles('instructor'),instructorController.updateQuiz)


instructorRoute.post('/addReply/:reviewId',protect,authorizeRoles("instructor"),instructorController.addReply)


instructorRoute.post('/addLesson',protect,authorizeRoles('instructor'),instructorController.AddLessons)
instructorRoute.post('/updateLesson/:lessonId',protect,authorizeRoles("instructor"),instructorController.updateLesson)
instructorRoute.post('/deleteLesson/:lessonId',protect,authorizeRoles('instructor'),instructorController.deleteLesson)





module.exports = instructorRoute