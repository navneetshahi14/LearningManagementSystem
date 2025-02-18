const course = require("../model/CourseSchema");
const Quiz = require("../model/QuizSchema");
const Review = require('../model/ReviewSchema')

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
  

module.exports = {
  CourseCreation,
  CourseDeletion,
  QuizCreation,
  submitQuiz,
  updateQuiz,
  addReply
};
