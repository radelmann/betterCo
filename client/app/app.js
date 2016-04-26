var app = angular.module('betterco', [
    'betterco.services',
    'betterco.comment',
    'betterco.auth',
    'ngRoute',
    'angularModalService'
  ])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/comments', {
        templateUrl: 'app/comment/comment.html',
        controller: 'CommentController'
      })
      .when('/login', {
        templateUrl: 'app/auth/login.html',
        controller: 'AuthController'
      })
      .when('/register', {
        templateUrl: 'app/auth/register.html',
        controller: 'AuthController'
      })
      .otherwise('/login');
    $httpProvider.interceptors.push('AttachTokens');
  })
  .factory('AttachTokens', function($window) {
    var attach = {
      request: function(object) {
        var jwt = $window.localStorage.getItem('com.betterco.token');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })
  .run(function($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
      if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
        $location.path('/login');
      }
    });
  });

app.controller('ModalController', function($scope, close) {
  $scope.message = '';
  $scope.close = function(result) {
    if (result === 'post') {
      close($scope.message, 500);
    }
  };
});