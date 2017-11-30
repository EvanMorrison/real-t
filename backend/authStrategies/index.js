module.exports = function(passport) {
  
  require('./googleStrategy')(passport);
  require('./localStrategy')(passport);

}