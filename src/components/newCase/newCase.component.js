require('../cardComponents/')
require('./newCaseStyles.scss');

module.exports = function(app) {
  app
  .component('newCase', {
    template: require('./newCase.template.html'),
    controller: [ 
                  '$state',
                  '$timeout',
                  'caseService',
                  NewCaseController
                ],
    controllerAs: 'vm',
    bindings: {
    }
  });

  function NewCaseController($state, $timeout, caseService) { 
    const vm = this;
    vm.viewTitle = 'Create A New Case'
    vm.showInputs = true;
    vm.isCreating = false;
    
    $timeout(function() {window.scrollTo(0,65);},750)

    vm.$onInit = () => {
      vm.getNames();
    }

    vm.$onChanges = () => {
      console.log('new case ', vm.newCase);
    }
    
    vm.initiateNewCase = () => {
       caseService.generateNewCase()
      .then(result => {
        vm.isCreating = true;
        vm.newCase = result;
        let focusElement = angular.element(document.getElementsByTagName('md-autocomplete')[0]);
        $timeout(function() {focusElement.focus()});
      })
      .catch(err => {
        console.log('error in controller creating new case ', err);
      })
    }

    vm.getNames = () => {
      caseService.getAllNames()
      .then(result => {
        vm.names = result;
      })
      .catch(err => console.log('error in controller getting list of names: ', err));
    }

    vm.submitForm = ($event, data) => {
      $event.preventDefault();
      // using data input, add matching persons and property, or create new ones
    }

    vm.saveChanges = function(data, category) {
      caseService.updateRecord(data, category)
        .then(result => {
            vm.newCase = Object.assign({}, vm.newCase, result);
            console.log('result ', result);

        })
        .catch(err => {
          console.log('controller error with updating record ', err)
          vm.waiting = false;
          console.log('error saving changes ', err)
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Error Saving')
                .textContent(`There was a problem saving: ${err}`)
                .ok('Ok')
          )
        })
    }


    vm.cancelWithoutSaving = () => {
      caseService.deleteCase(vm.newCase)
      .then(result => {
        console.log('the new case has been discarded without saving ', result);
        vm.newCase = {};
        vm.isCreating = false;
      })
      .catch(err => {
        console.log('error in new case controller, discarding case. ', err)
      })
    }

    

  }

}