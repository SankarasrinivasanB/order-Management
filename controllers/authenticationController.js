const passport = require('passport');
const authenticateHelper = require("../helpers/authenticationHelper");
const authenticateService = require("../services/authenticationService");
const util = require('../utils/util')()

module.exports.resetPassword = async (req,res)=>{
  const {token} = req.params;
  const checkTokenExpiry = await authenticateHelper.checkUserExpired(token);
  console.log(checkTokenExpiry);
  let user = req.body;
  if(!checkTokenExpiry){
    util.setError(400,"Reset Password Link expired.Please retry");
    return util.send(res);  
  }
  const hashedPassword = await authenticateHelper.setPassword(req.body.password);
    user.salt = hashedPassword.salt;
    user.hash = hashedPassword.hash;
    user.resetPasswordToken = null;
    try{
      const updateResetPassword = await authenticateService.setResetPassword(user)
      if(updateResetPassword){
        const sendResetPasswordSuccess = await authenticateHelper.resetPasswordAcknowledge(user.body.email);
        util.setSuccess(200,"",{
          message: "Password Reset success"
        },sendResetPasswordSuccess)
        return util.send(res);
      }
      util.setError(400,"User Email doesn't exists");
      return util.send(res);
    }catch(err){
      util.setError(404,err)
      return util.send(res)
    }
}

module.exports.forgotPassword = async (req,res) => {
  const email = req.body.email;
  const host = req.headers.host;
  console.log(host);
  const checkUserExist = await authenticateService.checkUserExist({email});
  if(!checkUserExist){
    util.setError(400,"Email Id Doesn't exists");
    return util.send(res);
  }
  const token = await authenticateHelper.generateJwt(req.body.email);
  const saveToUser = await authenticateService.saveForgotPasswordToken(email,token); 
  if(saveToUser){
    const sendResetPasswordLink = await authenticateHelper.sendResetPasswordLink(email,token,host);
    
    util.setSuccess(200,"sent success",sendResetPasswordLink);
      console.log("sendResetPasswordLink0",sendResetPasswordLink);
    
  return util.send(res);
  }

};

module.exports.register = async (req, res) => {
    console.log(`Registering user: ${req.body.email}`);
    let user = {};
    user = req.body;
    const hashedPassword = await authenticateHelper.setPassword(req.body.password);
    
    user.salt = hashedPassword.salt;
    user.hash = hashedPassword.hash;
    try{
      const register = await authenticateService.register(user);
      if(register){
        const token = await authenticateHelper.generateJwt(req.body.email);
        util.setSuccess(200,"",{
          message: "User Registered Successfully",
          token: token
        })
        return util.send(res);
      }else{
        util.setError(400,"User Email already exist");
        return util.send(res);
      }
     
    }catch(err){
      util.setError(404,err)
      return util.send(res)
    }
  };

  module.exports.login = (req, res) => {
    console.log(`Logging in user: ${req.body.email}`);
    passport.authenticate('local', (err, user, info) => {
        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err);
          return;
        }
        // If a user is found
        if (user) {
          const token = authenticateHelper.generateJwt(req.body.email);
          util.setSuccess(200,"",{
            message: "User Logged in Successfully",
            token: token
          })
          return util.send(res);
        } else {
          // If user is not found
          util.setError(404,info)
          return util.send(res)
        }
      })(req, res);
  };