'use strict';

angular.module('NepPasalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Aboutus', {
        title: 'Our shopping application',
        url: '/Aboutus',
        templateUrl: 'app/About Us/Aboutus.html'
        //controller: 'AboutusCtrl'
      });
  });
