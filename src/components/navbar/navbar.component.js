import template from './navbar.template.html';

export default function(app) {
   app
      .component('navbar', {
        template,
        controller: [ NavbarController ],
        controllerAs: 'vm',
        bindings: {
                    user: '<',
                    onSignout: '&'
        }
      });


      function NavbarController() {
        const vm = this;
        
        

        vm.signout = function() {
          console.log('trying to signout');
          vm.onSignout();
        }
        
      }
}
