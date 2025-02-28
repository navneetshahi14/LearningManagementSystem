const course = require('../model/CourseSchema')
const category = require('../model/Category')
const Review = require('../model/ReviewSchema')

const fs = require('fs')
const path = require('path')
const lesson = require('../model/LessonSchema')

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

const getReviews = async (req, res) => {
    try {
      const { courseId } = req.params;
  
      const reviews = await Review.find({ course: courseId })
        .populate("user", "name email")
        .populate("replies.user", "name email");
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const streamVideo = async(req,res) =>{
    try{

        const {lessonId} = req.params
        const lessons = await lesson.findById(lessonId)
        
        if(!lessons) return res.json({msg:"Lesson not found!!!"})

        const VideoPath = path.join(__dirname,"../uploads/videos",lessons.videoUrl)

        if(!fs.existsSync(VideoPath)){
            return res.status(404).json({ message: "Video file not found" })
        }

        const stat = fs.statSync(VideoPath);
        const fileSize = stat.size;
        const range = req.headers.range;
    
        if (!range) {
          return res.status(400).send("Requires Range header");
        }
    
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
        const contentLength = end - start + 1;
    
        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
        });
    
        const videoStream = fs.createReadStream(VideoPath, { start, end });
        videoStream.pipe(res);

    }catch(err){
        console.log(err.message)
    }
  }
  

module.exports = {
    getCourse,
    getCourseById,
    CourseSearchByTag,
    CategoryAccess,
    getReviews,
    streamVideo
}