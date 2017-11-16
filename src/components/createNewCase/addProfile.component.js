module.exports = function(app) {
  
  app.component('rtAddProfile', {
    template: require('./addProfile.template.html'),
    controller: [ 
                    'caseService',
                    AddProfileController
    ],
    controllerAs: 'vm',
    bindings: { 
                'category': '@',
                'names': '<',
                'onSubmit': '&'
    }
  })

  function AddProfileController(caseService) {
    const vm = this;

    vm.itemSelected = () => {
      console.log('selected item ', vm.selectedItem)
      if (vm.selectedItem !== null) {
        caseService.getPerson(vm.selectedItem._id)
        .then(result => vm.person = result)
        .catch(err => console.log('error getting person: ', err))
      } else vm.person = null;
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