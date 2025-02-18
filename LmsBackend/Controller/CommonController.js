const course = require('../model/CourseSchema')
const category = require('../model/Category')

const getCourse = async(req,res) =>{
    try{

        const allCourse = await course.find().populate('instructor','name email')
        res.status(200).json(allCourse)
        
    }catch(err){
        console.log(err.message)
    }
}


const getCourseById = async(req,res) =>{
    try{
        const {id} = req.params

        const CourseById = await course.findById(id).populate('instructor','name email')
        res.status(200).json(CourseById)
    }catch(err){
        console.log(err.message)
    }
}

const CourseSearchByTag = async(req,res) =>{
    try{
        const {tag} = req.query


        const courseSearch = await course.find({tags:{ $in: tag.split(" ") }})
        res.status(200).json(courseSearch)
    }catch(err){
        console.log(err.message)
    }
}

const CategoryAccess = async(req,res) =>{
    try{
        const Allcategory = await category.find()
        res.status(200).json(Allcategory)
    }catch(err){
        console.log(err.message)
    }
}

module.exports = {
    getCourse,
    getCourseById,
    CourseSearchByTag,
    CategoryAccess
}