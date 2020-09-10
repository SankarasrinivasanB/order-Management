const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const database = require("../models")
const User = database.users;
const authHelper = require("../helpers/authenticationHelper")
passport.use(
    new LocalStrategy(
      {
        usernameField: 'email'
      },
      function(username, password, done) {
        User.findOne({ email: username }, function(err, user) {
          if (err) {
            return done(err);
          }
          // Return if user not found in database
          if (!user) {
            return done(null, false, {
              message: 'User not found'
            });
          }
          console.log("in passport",user);
          // Return if password is wrong
          if (!authHelper.validPassword(password,user.salt,user.hash)) {
            return done(null, false, {
              message: 'Password is wrong'
            });
          }
          // If credentials are correct, return the user object
          return done(null, user);
        });
      }
    )
  );
  module.exports = passport;