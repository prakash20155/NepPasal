'use strict';

angular.module('NepPasalApp')
  .controller('ContactCtrl', function ($scope,$http,toastr) {
    $scope.contact = {};
    $scope.contactfn=function(){
         $http.post('/api/contact',$scope.contact).then(function(response){
          //console.log(response);
             $scope.contact = {};
             toastr.info('Your query has been sent.', 'Success');
         },
             function(response){
                 toastr.error('something went wrong.', 'error');

             });
    };
  });
