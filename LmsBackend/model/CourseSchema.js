const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    // category:{type:mongoose.Schema.Types.ObjectId,ref:"CourseCategory",required:true},
    category:{type:String},
    instructor:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    price:{type:Number,default:0},
    thumbnail:{type:String,default:"https://imgs.search.brave.com/qRX4-nqRSDV_qt48kP6Y9QTF0WxMuAoL_TpAuun2Ed0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zb2xp/bG9xdXl3cC5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTYv/MDgvSG93LXRvLVNl/dC1hLURlZmF1bHQt/RmVhdHVyZWQtSW1h/Z2UtaW4tV29yZFBy/ZXNzLnBuZw"},
    lessons:[{type:mongoose.Schema.Types.ObjectId,ref:"lesson"}],
    studentEnrolled:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
    tags:[{type:String}],    
    createdAt:{type:Date,default:Date.now}
})


const course = mongoose.model('Course',courseSchema)

module.exports = course