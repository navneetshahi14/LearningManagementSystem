const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    categoryname:{
        type:String,
        required:true
    },
    categoryField:[{
        type:String
    }]
})


const category = mongoose.model('CourseCategory',categorySchema)

module.exports = category