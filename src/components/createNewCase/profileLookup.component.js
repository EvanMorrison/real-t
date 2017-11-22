module.exports = function(app) {
  app.component('rtProfileAutocomplete', {
      template: [
      '  <md-autocomplete class="autocomplete-input {{vm.key}}"',
      '         ng-focus="vm.getSearchList(vm.path, vm.key, vm.filter)"',
      '        id="myAC"  ',
      '        md-input-name="{{vm.key}}Lookup"',
      '        md-selected-item="vm.selectedItem"',
      '        md-selected-item-change="vm.itemSelected(vm.selectedItem, vm.path)"',
      '        md-search-text="vm.searchText"',
      '        md-items="item in vm.querySearch(vm.searchText, vm.searchList, vm.key)"',
      '        md-item-text="item[vm.key]"',
      '        md-floating-label="{{vm.label}}"',
      '        md-autoselect',
      '        md-select-on-match',
      '        md-match-case-insensitive>',
      '    <md-item-template>',
      '      <span md-highlight-text="vm.searchText" md-highlight-flags="i">{{item[vm.key]}}</span>',
      '    </md-item-template>',
      '  </md-autocomplete>  '].join(''),
      controllerAs: 'vm',
      controller: [ 'caseService', ProfileAutocompleteController ],
      bindings: {
                    'path': '<', // api path base
                    'key': '<', 
                    'filter': '<',
                    'actions': '<',
                    'onItemSelected': '&'
      }
})
      function ProfileAutocompleteController(caseService) {
        const vm = this;
         
        vm.$onInit = () => { // set the floating label in the autocorrect input
          vm.label = 'search by '
          vm.label += vm.key.replace(/[A-Z]/g, match => ' ' + match.toLowerCase())
          if (vm.key === 'name') vm.label += ' for an existing profile'
        }

        // path = api base path, key = field for autocomplete list, filter = category to limit list results
        vm.getSearchList = (path, key, filter) => {
          caseService.getLookupList(path, key, filter)
          .then(result => {
            vm.searchList = result
          })
          .catch(err => console.log('getSearchList error', err))
        }
        
        vm.$onChanges = (changes) => {
          if (changes.actions) {
            let currActions = changes.actions.currentValue;
            let prevActions = changes.actions.previousValue;
            if (currActions.clearSearch === true && currActions.clearSearch != prevActions.clearSearch) {
              vm.selectedItem = null;
            }
          }
        }

        vm.querySearch = (query, searchList, key) => {
          let results = query ? searchList.filter((item) => {
            query = angular.lowercase(query);
            let compareItem = angular.lowercase(item[key]);
            return (compareItem.indexOf(query) != -1);
          }) : searchList;
          return (results.length ? results : [{name: 'no match found'}]);
        }

        vm.itemSelected = (item, path) => {
          if (!item || item[vm.key] === 'no match found') item = null, vm.selectedItem = null;
          vm.onItemSelected({item, path});
        }

      }
}

