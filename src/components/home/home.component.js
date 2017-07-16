
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
                  onLogout: '&'
      }
    });

    function HomeController() {
      const vm = this;

      vm.signOut = function() {
        vm.onLogout();
      }
        
      
    }

}