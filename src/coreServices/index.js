
module.exports = function(app) {
  
  require('./case.service')(app);
  require('./auth.service')(app);

}