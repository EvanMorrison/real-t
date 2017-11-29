module.exports = function(app) {
  require('./infoCard.scss');
  require('./personInfo.component')(app);
  require('./propertyInfo.component')(app);
  require('./loanInfo.component')(app);
  require('./documentInfo.component')(app);
}