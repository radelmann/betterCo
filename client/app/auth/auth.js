angular.module('betterco.auth', [])

.controller('AuthController', function($scope, $window, $location, $routeParams, Auth) {
  $scope.user = {};

  $scope.info = '';
  $scope.error = '';

  $scope.login = function() {
    Auth.login($scope.user)
      .then(function(data) {
        $window.localStorage.setItem('com.betterco.token', data.token);
        $window.localStorage.setItem('com.betterco.user', $scope.user.email);
        $location.path('/comments');
      })
      .catch(function(error) {
        $scope.error = error.data.message;
      });
  };

  $scope.register = function() {
    Auth.register($scope.user)
      .then(function(data) {
        $window.localStorage.setItem('com.betterco.token', data.token);
        $window.localStorage.setItem('com.betterco.user', $scope.user.email);
        $location.path('/comments');
      })
      .catch(function(error) {
        $scope.error = error.data.message;
      });
  };

  $scope.initValidators = function() {
    var password = document.getElementById("password");
    var confirm_password = document.getElementById("confirmPassword");

    $scope.validatePassword = function() {
      if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
      } else {
        confirm_password.setCustomValidity('');
      }
    }

    password.onchange = $scope.validatePassword;
    confirm_password.onkeyup = $scope.validatePassword;
  }
});