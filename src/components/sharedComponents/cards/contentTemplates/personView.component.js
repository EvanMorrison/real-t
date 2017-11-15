module.exports = function(app) {
  app.component('rtPersonView', {
    template: require('./personView.template.html'),
    controllerAs: 'vm',
    bindings: {
        person: '<'
      },
    
  })
}