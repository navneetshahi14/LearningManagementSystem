const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

let mongooseUri = process.env.MongooseUri || "mongodb://localhost:27017/lmsDB"

const DbConnection =async()=>{
    try{

        await mongoose.connect(mongooseUri,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        } )
        .then(()=>{console.log('Db Connected')})
        .catch(()=>{
            console.log("DB not connected");
        })

    }catch(err){
        console.log(err.message);
    }
}

module.exports = DbConnection