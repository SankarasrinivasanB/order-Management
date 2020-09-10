const database = require("../models");
const { use } = require("chai");
const User = database.users;

exports.setResetPassword = async (userDetails) => {
    const checkUserExists = await User.findOne({"email":userDetails.email});
    try{
        if(checkUserExists){
            return await User.updateOne({"email":userDetails.email},userDetails); 
        }
        return null;
    }catch(err){
        throw(err);
    }
}

exports.register = async (userDetails) =>{
    const checkUserExists = await User.findOne({"email":userDetails.email});
    try{
        if(!checkUserExists){ 
            return await User.create(userDetails);
        }
       return null;
    }catch(err) {
        throw err;
    }
};

exports.checkUserExist = async (userDetails) => {
    try{
        console.log("emial",userDetails.email)
        return await User.findOne({"email":userDetails.email});
    }catch(err){
        throw err;
    }
}

exports.saveForgotPasswordToken = async (email,token) => {
    try{
        return await User.updateOne({"email":email},{"resetPasswordToken":token})
    }catch(err){
        throw err
    }
}

