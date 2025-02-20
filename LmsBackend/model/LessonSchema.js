const mongoose = require('mongoose')

const LessonSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    course:{type:mongoose.Schema.Types.ObjectId,ref:'Course',required:true},
    videoUrl:{type:String,required:true},
    position:{type:Number,default:0}
})


const lesson = mongoose.model('lesson',LessonSchema)

module.exports = lesson