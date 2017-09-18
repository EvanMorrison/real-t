
module.exports =function(ngModule) {

  ngModule
    .component('home', {
      template: require('./home.template.html'),
      controller: [ 
                    HomeController
                  ],
      controllerAs: 'vm',
      bindings: {
                  'user': '<',
                  onSignout: '&'
      }
    });
    function HomeController() {
      const vm = this;

      vm.signout = function() {
        vm.onSignout();
      }
        
      
    }

}