angular.module('betterco.comment', [])
  .controller('commentController', ['$scope','COMMENT', function($scope, COMMENT) {
    $scope.data = {};
    $scope.data.items = [];

    COMMENT.getAll().then(function(data) {
      $scope.data.items = data;
    });
  }]);