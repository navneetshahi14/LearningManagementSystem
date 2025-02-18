const course = require('../model/CourseSchema')

const CourseCreation = async(req,res) =>{
    try{

        const {title,description,price,thumbnail,category,tag} = req.body
        const newCourse = new course({
            title,
            description,
            price,
            thumbnail,
            category,
            tag,
            instructor:req.user.id
        })


        await newCourse.save()
        res.status(200).json({msg:"Course Created",course})

    }catch(err){
        console.log(err.message)
    }
}



module.exports = {
    CourseCreation
}