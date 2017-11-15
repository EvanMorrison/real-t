
module.exports = function(app) {
  app.component('personCard', {
    template: require('./personCard.template.html'),
    controller: [
                  'phoneFilter',
                  PersonCardController
    ],
    controllerAs: 'vm',
    transclude: true,
    bindings: {
                'person': '<',
                'category': '@',
                'showEditBtn': '<',
                'showInputs': '<',
                'onSaveClick' : '&',
                'onEditClick' : '&'
    }
  })

  function PersonCardController(phoneFilter) {
    const vm = this;
    vm.saved = true;
    
    
    vm.handleEditClick = $event => {
        vm.onEditClick({$event: $event, category: vm.category});
    }

    vm.update = () => {
      vm.saved = false;
    }
    vm.handleSaveClick = $event => {
      vm.onSaveClick({data: vm.person, category: 'person'});
      vm.saved = true;
      vm.handleEditClick($event);
    }

    /**
     *  methods to be moved up the tree 
     */

    vm.personTypes = ['individual', 'organization', 'trust']

    vm.query = (query, collection) => {
      let results = query ? collection.filter( item => {
        let query = angular.lowercase(query);
        return ((item) => (item.indexOf(query) === 0));
      }) : vm.personTypes;
    }

  }

}