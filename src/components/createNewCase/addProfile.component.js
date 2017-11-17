module.exports = function(app) {
  
  app.component('rtAddProfile', {
    template: require('./addProfile.template.html'),
    require: {
      newCaseCtrl: '^caseSetup'
    },
    controller: [ 
                    'caseService',
                    AddProfileController
    ],
    controllerAs: 'vm',
    bindings: { 
                'category': '<',
                'names': '<',
                'onSubmit': '&'
    }
  })

  function AddProfileController(caseService) {
    const vm = this;

    vm.itemSelected = () => {
      if (vm.selectedItem !== null) {
        vm.newCaseCtrl.getProfile(vm.selectedItem)
        .then(result => vm.profile = result)
        .catch(err => err);
      } else vm.profile = {};
    }

    vm.handleSubmit = ($event) => {
      vm.onSubmit($event, { data: vm.caseData });
    }

    vm.querySearch = (query) => {
      let results = query ? vm.names.filter((item) => {
        query = angular.lowercase(query);
        let name = angular.lowercase(item.name);
        return (name.indexOf(query) != -1);
      }) : vm.names;
      return results;
    }

  }


}