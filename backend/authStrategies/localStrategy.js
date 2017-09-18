const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports = function(passport) {

  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true
    }, 
    function(req, email, password, done) {
          User.findOne({ email: email.toLowerCase() }, '-password', function(err, user) {
            if (err) {
              return done(err); 
            }
            if (user) { 
              return done(null, false, {message: 'Email already in use.', provider: user.provider}); 
            }
            if (!user) { // no existing user, create new user
                let newUser = new User(req.body);
                newUser.save(function(err, savedUser) {
                  if (err) return done(err);
                  if (savedUser) {
                    return done(null, savedUser);
                  }
                });
            }    
          });
    }
  ));


  passport.use('local-signin', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true
      }, function(req, email, password, done) {
          let user = req.body;
            // signin check is handled with a custom static method on the User model      
          User.authenticateLocalSignin(email, password, function(err, user, message) {
              if (err) return done(err);
              if (!user) return done(null, null, message);
              return done(null, user)
          })     
      }
  ));

}