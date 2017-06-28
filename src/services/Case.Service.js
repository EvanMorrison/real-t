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
      
      

      // this.getFullCase = function() {
      //   return $http.get('services/data.json')
      //   .then(function(response){
      //     let data = response.data;
      //     data.loan.DOT.recorded = new Date(data.loan.DOT.recorded)
      //     data.loan.assignments[0].recorded = new Date(data.loan.assignments[0].recorded)
      //     return response.data;
      //   })
      // }

      const cases = [
        
        {
          "file": "16-77810",
          "property": {
            "address": "3183 S State St.",
            "city": "Ogden",
            "county": "Weber",
            "taxId": "37-8280-02"
          },
          "lender": {
            "name": "Diane Mulkazy",
            "phone": "4352230958",
            "address": "3852 S Blackrock Dr",
            "city": "Sandy",
            "state": "UT",
            "zip": "84260"
          },
          "borrower": {
            "name": "Thomas Peterson",
            "address":"7237 S Chapita Way",
            "city":"Pleasant Grove",
            "state": "UT",
            "zip": "84263",
            "loanAmount": 688300,
            "defaultDate": "",
            "saleDate": ""
          }
        }
      ]


        

    }

})();
