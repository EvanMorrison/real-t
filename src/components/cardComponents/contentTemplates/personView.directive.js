module.exports = function(app) {
  app.directive('rtPersonView', function() {
    return {
      scope: {
        person: '='
      },
      template: require('./personView.template.html')
    }
  })
}