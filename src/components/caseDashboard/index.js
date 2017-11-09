module.exports = function(app) {
  require('./caseDashboard.component')(app);
  require('./timeline.component')(app);
  // require('./fullDetail/fullDetail.component')(app);
  require('./editToolbar.component')(app);
  require('./cardComponents/editButton/editButton.component')(app);
  require('./cardComponents/cards.component')(app);
  require('./cardComponents/personCard.component')(app);
  require('./cardComponents/propertyCard.component')(app);
  require('./cardComponents/loanCard.component')(app);
}