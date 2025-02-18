const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{
        type:String,
        enum:['student',"admin","instructor"],
        default:"student"
    },
    profilePic:{type:String,default:"https://imgs.search.brave.com/mA3HLGx6Ebkn8MDRvppihZijovSzMKEXq6f8rDm4zuw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzQwLzk4Lzc2/LzM2MF9GXzk0MDk4/NzY5M19wMzI5TjJk/RkNXN2pHN1lxdDNr/NUg5ZHhLb1lxS1NJ/US5qcGc"},
    bio:{type:String,maxlength:500},
    enrolledCourse:[{type:mongoose.Schema.Types.ObjectId , ref:"Course" }],
    courseCreated:[{ type:mongoose.Schema.Types.ObjectId , ref:"Course" }],
    createAt:{type:Date,default:Date.now}
})

const user = mongoose.model('user',userSchema)
module.exports = user