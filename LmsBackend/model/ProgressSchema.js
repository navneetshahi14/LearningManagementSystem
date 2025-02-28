const mongoose = require('mongoose')

const ProgressSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    course:{type:mongoose.Schema.Types.ObjectId,ref:"Course",required:true},
    progress:{type:Number,default:0},
    completedLessons:[{type:mongoose.Schema.Types.ObjectId,ref:'lesson'}],
    enrolledAt:{type:Date,default:Date.now}
})

const progress = mongoose.model('progress',ProgressSchema)

module.exports = progress