
module.exports =function(ngModule) {

  ngModule
    .component('home', {
      template: require('./home.template.html'),
      controller: [ 
                    '$firebaseAuth',
                    HomeController
                  ],
      controllerAs: 'vm',
      bindings: {
                  'user': '<'
      }
    });

    function HomeController($firebaseAuth) {
      const vm = this;


      vm.authObj = $firebaseAuth();

      vm.signOut = function() {
        vm.authObj.$signOut()
      }
        
      
    }

}