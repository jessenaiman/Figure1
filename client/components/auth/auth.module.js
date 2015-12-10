'use strict';

angular.module('figure1App.auth', [
  'figure1App.constants',
  'figure1App.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
