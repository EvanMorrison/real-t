module.exports = function(app) {
  app.component("rtPersonEdit", {

    template: require('./personEdit.template.html'),
    controllerAs: 'vm',
    bindings: {
        person: '<',
        saved: '<',
        handleSaveClick: '&',
        update: '&'
      }
      
    })

}
