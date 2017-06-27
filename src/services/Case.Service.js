(function() {
  'use strict';

  angular.module('RTApp')
    .service('caseService', ['$q','$firebaseArray', '$firebaseObject', '$firebaseRef', '$stateParams', CaseService])


    function CaseService($q, $firebaseArray, $firebaseObject, $firebaseRef, $stateParams) {
      const self = this;


      self.getFullCase = function(searchId) {
          // const caseId = searchId;
          // let caseId = $stateParams.caseId ? $stateParams.caseId : '17-62829'
          // searchId = null
          
          return $firebaseObject($firebaseRef.cases.child(searchId));
        
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
          "file": "17-34829",
          "property": {
            "address1": "7561 S Highland Dr.",
            "city": "Salt Lake City",
            "county": "Salt Lake",
            "taxId": "02-385-3829-025"
          },
          "lender": {
            "name": "Steve Choat",
            "phone": "4358783202",
            "address1": "224 E 800 S",
            "city": "Farmington",
            "state": "UT",
            "zip": "84032"
          },
          "borrower": {
            "name": "Paul Brack",
            "address1":"5822 W 200 S",
            "city":"Bluffdale",
            "state": "UT",
            "zip": "84138",
            "loanAmount": 150000,
            "defaultDate": "",
            "saleDate": ""
          }
        },
        {
          "file": "16-77810",
          "property": {
            "address1": "3183 S State St.",
            "city": "Ogden",
            "county": "Weber",
            "taxId": "37-8280-02"
          },
          "lender": {
            "name": "Diane Mulkazy",
            "phone": "4352230958",
            "address1": "3852 S Blackrock Dr",
            "city": "Sandy",
            "state": "UT",
            "zip": "84260"
          },
          "borrower": {
            "name": "Thomas Peterson",
            "address1":"7237 S Chapita Way",
            "city":"Pleasant Grove",
            "state": "UT",
            "zip": "84263",
            "loanAmount": 688300,
            "defaultDate": "",
            "saleDate": ""
          }
        },
        {
          "file": "17-60612",
          "property": {
            "address1": "720 N Canyon View Rd.",
            "city": "St. George",
            "county": "Washington",
            "taxId": "SG-BR357"
          },
          "lender": {
            "name": "Kirk Brontwell",
            "phone": "8017823385",
            "address1": "485 E 300 S",
            "city": "Salt Lake City",
            "state": "UT",
            "zip": "84111"
          },
          "borrower": {
            "name": "Sherri Perkins",
            "address1":"52 N Lakeview Blvd",
            "city":"Cottonwood Heights",
            "state": "UT",
            "zip": "84102",
            "loanAmount": 253700,
            "defaultDate": "",
            "saleDate": ""
          }
        }
      ]


        self.LoadAllCases = function() {
          
          return $q.when(cases)

        }

    }

})();
