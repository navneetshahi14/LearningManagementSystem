const category = require('../model/Category')
const user = require('../model/UserSchema')

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


module.exports = {
    categoryCreation,
    categoryDeletion,
    AllUser
}