const progress = require('../model/ProgressSchema')
const Review = require("../model/ReviewSchema");

const trackProgress = async(req,res) =>{
    try{

        const {userId,courseId,completedLessons} = req.body

        let enrollment = await progress.findOne({user:userId,course:courseId})

        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
          }
      
        enrollment.completedLessons = completedLessons;
        enrollment.progress = (completedLessons.length / enrollment.totalLessons) * 100;
    
        await enrollment.save();
        res.json({ message: "Progress updated!", progress: enrollment.progress });      

    }catch(err){
        console.log(err.message)
    }
}

const getUserStat = async(req,res) =>{
    try {
        const userId = req.user.id;
    
        const enrollments = await progress.find({ user: userId }).populate("course", "title");
    
        let totalCourses = enrollments.length;
        let avgProgress = enrollments.reduce((acc, e) => acc + e.progress, 0) / totalCourses || 0;
    
        res.json({ totalCourses, avgProgress });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    
}


const AddReview = async(req,res) =>{
    try {
        const { course, rating, comment } = req.body;
        const userId = req.user.id; 
        
        const newReview = new Review({
          course,
          user: userId,
          rating,
          comment
        });
    
        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


module.exports = {
    trackProgress,
    getUserStat
}