const bcrypt = require('bcrypt');

const passwordHash = async(pass) =>{
    try{

        const passhashed = bcrypt.hash(pass,10)
        return passhashed
    }catch(err){
        console.error(err.message)
    }
}

const passwordCompare = async(pass,storedPass)=>{
    try{

        const passcompare = await bcrypt.compare(pass,storedPass)
        return passcompare

    }catch(err){
        console.error(err.message)
    }
}

module.exports = {
    passwordHash,
    passwordCompare
}