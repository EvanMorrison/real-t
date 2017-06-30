(function() {
  'use strict';

  angular.module('RTApp')
    .service('caseService', ['$firebaseArray', '$firebaseObject', '$firebaseRef', '$stateParams', CaseService])


    function CaseService($firebaseArray, $firebaseObject, $firebaseRef, $stateParams) {
      const self = this;

      self.getFullCase = function(searchId) {
          return $firebaseObject($firebaseRef.cases.child(searchId));
      }

      self.LoadAllCases = function() {
                
          return $firebaseArray($firebaseRef.cases);

      }
      
    }

})();
