(function() {
  'use strict';

  angular.module('RTApp')
    .service('caseService', ['$q', CaseService])

    

    function CaseService($q) {

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

      return {
        LoadAllCases: function() {
          
          return $q.when(cases)

        }
      }

    }

})();
