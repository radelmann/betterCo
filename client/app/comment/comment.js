angular.module('betterco.comment', [])
  .controller('commentController', ['$scope','COMMENT', function($scope, COMMENT) {
    $scope.data = {};
    $scope.data.items = [];

    $scope.commenting = false;

    COMMENT.getAll().then(function(data) {
      $scope.data.items = data;
    });

    $scope.submitComment = function() {
      var comment = {};
      comment.userName = "radelmann";
      comment.message = $scope.data.message;

      COMMENT.post(comment).then(function(data) {
        $scope.data.items.push(data); 
        $scope.commenting = false;
      });
    };

    $scope.showSubmitForm = function() {
      $scope.commenting = true;
    }
  }]);