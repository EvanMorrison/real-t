
module.exports = function(app) {
  
  require('./caseService.Service')(app);
  require('./auth.service')(app);

}