
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 3 * 60 * 1000;
const FAILED_AUTH_MSG = 'Invalid username or password.'
const ACCT_LOCKED_MSG = 'Account temporarily locked due to repeated failed attempts. Please try again later.'
const authTypes = ['google', 'facebook', 'github', 'linkedin', 'twitter'];
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    lowercase: true
    // required if not oauth
  },
  password: {
    type: String,
    required: function() {
      // required if not oauth
      // return authTypes.indexOf(this.provider) === -1;
    }
  },
  verified: {
    default: false
  },
  role: {
    type: String,
    default: 'user'
  },
  provider: {
    type: String,
    default: 'local'
  },
  facebook: {},
  google: {},
  linkedin: {},
  github: {},
  twitter: {},
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: { type: Number }
});

// VIRTUALS
userSchema.virtual('profile').get(function() {
  return {
    name: this.name,
    email: this.email,
    role: this.role,
    provider: this.provider
  }
});

userSchema.virtual('token').get(function() {
  return {
    id: this._id,
    role: this.role
  }
});

userSchema.virtual('isLocked').get(function() {
  // check for a future lockUnitl timestamp
  return !!(this.lockUntil && this.lockUntil > Date.now())
})


// pre-save hook
userSchema.pre('save', function(next){
  // handle new/updated passwords
  if (!this.isModified('password')) {
    return next();
  }
  // no password if using OAuth
  if (authTypes.indexOf(this.provider) !== -1) return next();
  else {
    this.hashPassword(this.password, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      return next();
    });
  }

})


// methods ===============================
// generate a hash
userSchema.methods.hashPassword = function(password, callback) {
      bcrypt.hash(password, SALT_FACTOR, (err, hash) => {
        if (err) return callback(err);
        return callback(null, hash);
      })
    }
  
    // check a password
userSchema.methods.verifyPassword = function(pwdAttempt, callback) {
      bcrypt.compare(pwdAttempt, this.password, (err, isMatch) => {
        if (err) return callback(err);
        else return callback(null, isMatch);
      })
    }

    // increment number of failed login attempts, or set lockout time if max 
    // failed attempts is reached
userSchema.methods.incLoginAttempts = function(cb) {
  // if a previous lock has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.update({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    }, cb);
  }
  let updates = { $inc: { loginAttempts: 1 } };
  // lock account if the max attempts has been reached
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + LOCK_TIME };
  }
  return this.update(updates, cb);
}



userSchema.statics.authenticateLocalSignin = function(email, password, cb) {
  this.findOne({ email: email }, function(err, user) {
    if (err) return cb(err);
    if (!user) return cb(null, null, { message: FAILED_AUTH_MSG})
    
    if (user.isLocked) {
      return user.incLoginAttempts(function(err) {
        if (err) return cb(err);
        return cb(null, null, { message: ACCT_LOCKED_MSG, lockoutTime: ((user.lockUntil - Date.now()) / 1000)})
      })
    }
    // user found, check password
    if (user.password) {
    user.verifyPassword(password, function(err, isMatch) {
      if (err) return cb(err);
      if (isMatch) {
        // password is correct, and no lock or failed attempts count, return the user
        if (!user.loginAttempts && !user.lockUnitl) return cb(null, user);

        // reset attempts and lock info
        let updates = {
          $set: { loginAttempts: 0 },
          $unset: { lockUntil: 1 }
        };
        return user.update(updates, function(err) {
          if (err) return cb(err);
          return cb(null, user);
        })
      }
    
      // password is incorrect, increment failed attempts 
      user.incLoginAttempts(function(err) {
        if (err) return cb(err);
        return cb(null, null, {message: FAILED_AUTH_MSG})
      })
    })
    }
    // no user password, email associated with existing OAuth account
    else return cb(null, null, {message: FAILED_AUTH_MSG, provider: user.provider})
  })
}

module.exports = mongoose.model('User', userSchema);
