const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


const generateToken = (id) =>{
    try{

        return jwt.sign({id},process.env.JWT_KEY,{
            expiresIn:"2d"
        })

    }catch(err){
        console.log(err)
    }
}

module.exports = {
    generateToken
}