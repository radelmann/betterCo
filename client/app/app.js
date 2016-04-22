angular.module('betterco', [
    'betterco.services',
    'betterco.comment',
    'ngRoute'
  ])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/comment/comment.html',
        controller: 'commentController'
      })
      .otherwise('/');
  });