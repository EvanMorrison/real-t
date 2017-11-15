module.exports = function(app) {
  
  app.component('newCaseCard', {
    template: require('./newCaseCard.template.html'),
    controller: [ 
                    'caseService',
                    NewCaseCardController
    ],
    controllerAs: 'vm',
    bindings: { 
                'category': '@',
                'names': '<',
                'onSubmit': '&'
    }
  })

  function NewCaseCardController(caseService) {
    const vm = this;

    vm.itemSelected = () => {
      console.log('selected item ', vm.selectedItem)
      if (vm.selectedItem !== null) {
        caseService.getPerson(vm.selectedItem._id)
        .then(result => {
          vm.person = result;
        })
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