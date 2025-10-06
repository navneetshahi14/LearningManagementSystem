import mongoose from 'mongoose'
require('dotenv').config()

const dbURL:string = process.env.DB_URI || ""

const connectDB = async()=>{
    try{
        await mongoose.connect(dbURL).then((data:any)=>console.log(`dataBase Connected with ${data.connection.host} `))
    }catch(err:any){
        console.log(err?.message)
        setTimeout(connectDB,5000)
    }
}

export default connectDB

