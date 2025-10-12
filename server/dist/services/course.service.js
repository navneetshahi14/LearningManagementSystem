"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCourseService = exports.CreateCourse = void 0;
const course_model_1 = __importDefault(require("../model/course.model"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
exports.CreateCourse = (0, catchAsyncError_1.CatchAsyncError)(async (data, res) => {
    const course = await course_model_1.default.create(data);
    res.status(201).json({
        success: true,
        course
    });
});
const getAllCourseService = async (res) => {
    const course = await course_model_1.default.find().sort({ createdAt: -1 });
    return course;
};
exports.getAllCourseService = getAllCourseService;
