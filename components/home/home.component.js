(function() {
  'use strict';

  angular.module('Home', [])

  // Usage:
  // 
  // Creates:
  // 


    .component('home', {
      templateUrl: '/components/home/home.template.html',
      controller: [HomeController]
    });

  function HomeController() {
    const $ctrl = this;
    

    ////////////////

    $ctrl.$onInit = function() { };
    $ctrl.$onChanges = function() { };
    $ctrl.$onDestroy = function() { };
  }
  
})();