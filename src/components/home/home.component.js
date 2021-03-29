import template from './home.template.html';

export default function(ngModule) {

  ngModule
    .component('home', {
      template,
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
