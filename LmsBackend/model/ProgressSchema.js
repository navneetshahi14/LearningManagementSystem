const mongoose = require('mongoose')

const ProgressSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    course:{type:mongoose.Schema.Types.ObjectId,ref:"Course",required:true},
    progress:{type:Number,}
})