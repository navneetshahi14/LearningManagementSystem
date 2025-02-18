const user = require('../model/UserSchema')
const {passwordHash, passwordCompare} = require('../Config/Pass')
const { generateToken } = require('../Config/GenerateToken')


const UserRegister = async(req,res) =>{
    try{
        
        const { name,email,password,profilePic,role,bio } = req.body

        if(!name || !email || !password ){
            res.status(404).json({msg:"Please fill all the fields"})
        }

        const existingUser = await user.find(email)

        const hashedPass = await passwordHash(password)

        if(!existingUser){
            const newUser = new user({
                name,
                email,
                hashedPass,
                profilePic,
                role,
                bio
            })

            const userSaved = await newUser.save()

            if(userSaved){
                res.status(200).json({msg:"Registered successfully",name:ifUserExist.name,email:ifUserExist.email,role:ifUserExist.role,profilePic:ifUserExist.profilePic,bio:ifUserExist.bio,enrolledCourse:ifUserExist.enrolledCourse,couserCreated:ifUserExist.courseCreated,token:generateToken(ifUserExist._id)})

            }else{
                res.status(404).json({msg:"Something went wrong"})
            }


        }else{
            res.status(201).json({msg:"User exist!!!"})
        }

    }catch(err){
        console.log("Error:->>",err.message)
    }
}


const UserLogin = async(req,res) =>{
    try{

        const {email,password} = req.body

        const ifUserExist = await user.find(email)

        if(!ifUserExist){
            res.status(404).json({msg:"User Doesn't exist"})
        }else{

            const passcomp = await passwordCompare(password,ifUserExist.password)

            if(passcomp){
                res.status(200).json({msg:"Login successful",name:ifUserExist.name,email:ifUserExist.email,role:ifUserExist.role,profilePic:ifUserExist.profilePic,bio:ifUserExist.bio,enrolledCourse:ifUserExist.enrolledCourse,couserCreated:ifUserExist.courseCreated,token:generateToken(ifUserExist._id)})
            }else{
                res.status(300).json({msg:"User Credentials are incorrect"})
            }

        }

    }catch(err){
        console.log("Error:->>",err.message)        
    }
}


module.exports = {
    UserRegister,
    UserLogin
}