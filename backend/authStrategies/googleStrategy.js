
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user.model');

const config = require('../config');


module.exports = (passport) => {

  passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL,
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
        // set user obj to profile and search for existing user
        console.log('find by google id ', profile.id)
        User.findOne({ 'google.id': profile.id  }, function(err, user) {
          if (err) return done(err);
          if (user) {
            console.log('existing google id found')
            user.google = profile._json;
            user.save(function(err, updatedUser) {
              if (err) return err;
              return done(null, updatedUser);
            })
          }
          if (!user) {
            // check if the email is associated with an existing account
            console.log('no google id, searching by email')
            User.findOne({'email': profile.emails[0].value}, function(err, user) {
              if (err) return done(err);
              if (user) { // email in use with local auth account
                
                // TODO: send email to user with link to reset password and/or confirm joining accounts

                // add google credentials to existing account
                console.log('local user found, updating with google profile')
                user.google = profile._json;
                user.name = profile.displayName;
                user.provider = 'google';
                user.save(function(err, savedUser) {
                  if (err) return done(err);
                  return done(null, savedUser);
                })

              }
              // no user found, create new user account
              else {
                let newUser = new User();
                console.log('google profile ', profile)
                newUser.email = profile.emails[0].value;
                newUser.name = profile.displayName;
                newUser.provider = 'google'; 
                newUser.google = profile._json;
                newUser.save(function(err, savedUser) {
                  if (err) return err;
                  return done(null, savedUser);
                })
              }
            })
            
            
          }

        })
       
  }))

}