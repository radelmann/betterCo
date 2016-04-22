angular.module('betterco.comment', [])
  .controller('commentController', ['$scope','COMMENT', function($scope, COMMENT) {
    $scope.data = {};
    $scope.data.items = [];

    COMMENT.getAll().then(function(data) {
      $scope.data.items = data;
    });

    $scope.submitComment = function() {
      var comment = {};
      comment.userName = $scope.data.userName;
      comment.message = $scope.data.message;

      COMMENT.post(comment).then(function(data) {
        $scope.data.items.push(data); 
      });
    };
  }]);