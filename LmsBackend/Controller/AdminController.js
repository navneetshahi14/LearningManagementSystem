const category = require('../model/Category')
const user = require('../model/UserSchema')
const Review = require('../model/ReviewSchema')

const categoryCreation = async(req,res)=>{
    try{

        const {categoryname,categoryField} = req.body

        const newCategory = new category({
            categoryname,
            categoryField
        })

        await newCategory.save()

        res.status(200).json({msg:"Category Created"})

    }catch(err){
        console.log(err.message)
    }
}


const categoryDeletion = async(req,res) =>{
    try{

        const {id} = req.body

        const deleted = await category.findByIdAndDelete(id)

        res.status(200).json({msg:"Category Deleted Successfully"})

    }catch(err){
        console.log(err.message)
    }
}

const AllUser = async(req,res) =>{
    try{

        const users = await user.find().populate('-password').populate('enrolledCourse','title').populate('createdCourse','title')
        
        res.status(200).json(users)


    }catch(err){
        console.log(err.message)
    }
}

const deleteReview = async (req, res) => {
    try {
      const { reviewId } = req.params;
      const userId = req.user.id;
  
      const review = await Review.findById(reviewId);
      if (!review) return res.status(404).json({ message: "Review not found" });
  
      if (review.user.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized to delete this review" });
      }
  
      await Review.findByIdAndDelete(reviewId);
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {
    categoryCreation,
    categoryDeletion,
    AllUser,
    deleteReview
}