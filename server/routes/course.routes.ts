import express from "express";
import { addAnswer, addQuestion, addReplyToReview, addReview, editCourse, generateVideoUrl, getAllCourse, getCourseByUser, getSingleCourse, GettingAllCourses, uploadCourse } from "../controller/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { deleteCourse, updateAccessToken } from "../controller/user.controller";
const CourseRouter = express.Router()

CourseRouter.post('/create-course',updateAccessToken,isAuthenticated,authorizeRoles('admin'), uploadCourse)

CourseRouter.put('/edit-course/:id',updateAccessToken,isAuthenticated,authorizeRoles('admin'), editCourse)

CourseRouter.get('/get-course/:id', getSingleCourse)

CourseRouter.get('/get-all-course', getAllCourse)

CourseRouter.get('/get-course-content/:id',updateAccessToken,isAuthenticated ,getCourseByUser)

CourseRouter.put('/add-question',updateAccessToken,isAuthenticated ,addQuestion)

CourseRouter.put('/add-answer',updateAccessToken,isAuthenticated ,addAnswer)

CourseRouter.put('/add-review/:id',updateAccessToken,isAuthenticated ,addReview)

CourseRouter.put('/add-reply',updateAccessToken,isAuthenticated, authorizeRoles("admin") ,addReplyToReview)

CourseRouter.get('/get-courses',updateAccessToken,isAuthenticated,authorizeRoles('admin'),GettingAllCourses)

CourseRouter.post('/getVideoCipherOTP',generateVideoUrl)

CourseRouter.delete('/delete-course/:id',updateAccessToken,isAuthenticated,authorizeRoles('admin'),deleteCourse)

export default CourseRouter