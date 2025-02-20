const course = require("../model/CourseSchema");
const Quiz = require("../model/QuizSchema");
const Review = require('../model/ReviewSchema')
const lesson = require('../model/LessonSchema')

const CourseCreation = async (req, res) => {
  try {
    const { title, description, price, thumbnail, category, tag } = req.body;
    const newCourse = new course({
      title,
      description,
      price,
      thumbnail,
      category,
      tag,
      instructor: req.user.id,
    });

    await newCourse.save();
    res.status(200).json({ msg: "Course Created", course });
  } catch (err) {
    console.log(err.message);
  }
};

const CourseDeletion = async (req, res) => {
  try {
    const { id } = req.body;

    const deleting = await course.findByIdAndDelete(id);

    res.status(200).json({ msg: "Deleted succefully" });
  } catch (err) {
    console.log(err.message);
  }
};

const QuizCreation = async (req, res) => {
  try {
    const { course, questions } = req.body;
    const quiz = new Quiz({ course, questions });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctAnswerIndex === answers[i]) {
        score++;
      }
    });

    res.json({ message: "Quiz submitted!", score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuiz = async(req,res) =>{
    try{
        const {id,questions} = req.body

        const findandupdate = await Quiz.findByIdAndUpdate(id,{
            $set:{
                questions
            }
        })

        res.status(201).json({msg:"Updated successfully"})
    }catch(err){
        console.log(err.message)
    }
}

const addReply = async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { comment } = req.body;
      const userId = req.user.id; // Authenticated user
  
      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      const newReply = { user: userId, comment };
      review.replies.push(newReply);
      await review.save();
  
      res.status(200).json({ message: "Reply added successfully", review });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  const AddLessons = async(req,res) =>{
    try{

      const {course,title,description,videoUrl} = req.body

      const findCourse = await course.findById(course)
      if(!findCourse) {
        return res.json({msg:"Course not found"})
      }

      else{
        const newLesson = new lesson({
          title,
          description,
          course,
          videoUrl,
          position:course.lessons.length + 1
        })

        await newLesson.save()
        
        await course.findByIdAndUpdate(course,{$push:{lessons:newLesson._id}})

        res.status(201).json({msg:"Lesson added successfully"})
      }

    }catch(err){
      console.log(err.message)
    }
  }

  const updateLesson = async(req,res)=>{
    try{

      const {lessonId} = req.params
      const { title, videoUrl, description } = req.body;

      const findingLesson = await lesson.findByIdAndUpdate(lessonId,{
        title,description,videoUrl
      },{new:true})

      if(!findingLesson){return res.status(404).json({ message: "Lesson not found" })}

      res.status(200).json({ message: "Lesson updated successfully"})

    }catch(er){
      console.log(er.message)
    }
  }


  const deleteLesson = async(req,res) =>{
    try{
      const {lessonId} = req.params

      const findLesson = await lesson.findById(lessonId)
      if(!findLesson) return res.json({msg:"Lesson not found!!!"})

      const updateCourse = await course.findByIdAndUpdate(findLesson.course,{$pull:{lessons:lessonId}})

      const deletedlesson = await lesson.findByIdAndDelete(lessonId)

      res.json({msg:"Lesson deleted successfully"})
    }catch(err){
      console.log(err.message)
    }
  }

module.exports = {
  CourseCreation,
  CourseDeletion,
  QuizCreation,
  submitQuiz,
  updateQuiz,
  addReply,
  updateLesson,
  deleteLesson,
  AddLessons
};
