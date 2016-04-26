
angular.module('betterco.services', [])

.factory('Comment', ['$http', function($http) {

  var getAll = function() {
    return $http({
        method: 'GET',
        url: '/comment/'
      })
      .then(function(resp) {
        return resp.data.data;
      }, function(err) {
        return [];
      });
  };

  var post = function(comment) {
    return $http({
        method: 'POST',
        url: '/comment/',
        data: JSON.stringify(comment)
      })
      .then(function(resp) {
        return resp.data;
      }, function(err) {
        return 'error';
      });
  }

  return {
    getAll: getAll,
    post: post
  };
}])
.factory('Auth', function($http, $location, $window) {
  var login = function(user) {
    return $http({
        method: 'POST',
        url: '/login',
        data: user
      })
      .then(function(resp) {
        return resp.data;
      });
  };

  var register = function(user) {
    return $http({
        method: 'POST',
        url: '/register',
        data: user
      })
      .then(function(resp) {
        return resp.data;
      });
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem('com.betterco.token');
  };

  var signOut = function() {
    $window.localStorage.removeItem('com.betterco.token');
    $window.localStorage.removeItem('com.betterco.user');
    $location.path('/#/login');
  };

  return {
    login: login,
    register: register,
    signOut: signOut,
    isAuth:isAuth
  };
});