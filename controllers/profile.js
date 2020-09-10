const database = require("../models")
const User = database.users;
const util = require("../utils/util")();

module.exports.profileRead = (req, res) => {
  // If no user ID exists in the JWT return a 401
  if (!req.params.id) {
    res.status(401).json({
      message: 'UnauthorizedError: private profile'
    });
  } else {
    // Otherwise continue
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      User.findById({_id:req.params.id}).exec(function(err, user) {
        if(err){
          throw err;
        }
        util.setSuccess(200,"User Retrived successfully",{
          name: user.name,
          email: user.email,
          message: "User Retrived successfully"
        });
        util.send(res);
      });
    }else{
      util.setError(400,"User doesn't match");
      return util.send(res);
    }
   
  }
};