module.exports = function(app) {
  app.directive("rtPersonEdit", [ function() {
    return {
      scope: {
        person: '=',
        saved: '=',
        handleSaveClick: '&',
        update: '&'
      },
      template: require('./personEdit.template.html')
    }
  }])
}