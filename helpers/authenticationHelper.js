const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const atob = require("atob");
const cron = require("node-cron");
/* const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY= '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'; */

exports.checkUserExpired = (token)=> {
const decodeToken = this.decodeBase64(token);
  if(decodeToken){
    console.log("decod",decodeToken.exp);
    console.log("data",Date.now()/1000);
    return (decodeToken.exp > Date.now()/1000);
  }else {
    return false;
  }
}

exports.decodeBase64 = (token) =>{
let payload;
if (!token) {
  return false;
}
  payload = token.split(".")[1];
  payload = atob(payload);
  return JSON.parse(payload);
}

exports.sendResetPasswordLink = async (email,token,host) => {
  let mailList = ["siby.cool3@gmail.com","siby.karthii@gmial.com","tamil99441@gmail.com"];
  let smtp = nodeMailer.createTransport({
    service : 'gmail',
    auth: {
      user: 'siby.karthii@gmail.com',
      pass: 'Asdf@1234'
    }
  });
  let msg = {
    //to: 'siby.cool3@gmail.com',
    from: 'siby.karthii@gmail.com',
    subject: 'Reset Password link',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://' + host + '/reset/' + token + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };
  mailList.forEach(element => {
    msg.to = element;
    console.log(msg);
    
 
  //process.exit(0);
  return new Promise((resolve,reject)=>{
    try{
      //cron.schedule("0 * * * * *",()=>{
        smtp.sendMail(msg,(err,info)=>{
          if(err){
            console.log(err);
            return resolve(err);
          }else{
            console.log(info);
            console.log("in info",info.response);
            return resolve(info.response);
          }
      
        });
      //});
    }catch(err){
      throw err
    }
        
  })
});
}

exports.resetPasswordAcknowledge = (email) =>{
let smtp = nodeMailer.createTransport({
  service : 'gmail',
  auth: {
    user: 'siby.karthii@gmail.com',
    pass: 'Asdf@1234'
  }
});
let msg = {
  to: 'siby.cool3@gmail.com',
  from: 'siby.karthii@gmail.com',
  subject: 'Your password has been changed',
      text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + email + ' has just been changed.\n'
    };
try{
  smtp.sendMail(msg,(err,info)=>{
    if(err){
      console.log(err);
      return err;
    }else{
      console.log(info);
      return info;
    }

  })
}catch(err){
  throw err
}
}

exports.setPassword = async (password) => {
  const salt = await crypto.randomBytes(16).toString('hex');
  const hash = await crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
    return {salt:salt,hash:hash};
};

exports.validPassword = (password,salt,hash) => {
  const loginHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return hash === loginHash;
};

exports.generateJwt = (email) => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + (expiry.getHours()+2));
  return jwt.sign(
    {
      email: email,
      exp: parseInt(expiry.getTime() / 1000)
    },
    'MY_SECRET'
  );
};