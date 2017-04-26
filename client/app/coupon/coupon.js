'use strict';

angular.module('NepPasalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coupon', {
        title: 'Manage your shop coupons',
        url: '/coupon',
        templateUrl: 'app/coupon/coupon.html',
        controller: 'CouponCtrl'
      });
  });
