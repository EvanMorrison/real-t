module.exports = function(app) {
  app
    .component('mainLayout', {
      template: require('./mainLayout.template.html'),
      controller: [MainLayoutController],
      controllerAs: 'vm',
      bindings: {
                  'user': '<',
                  'onSignout': '&'

      }
    });

    function MainLayoutController () {
      const vm = this;


    }
}