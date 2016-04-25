angular.module('betterco.comment', [])
  .controller('CommentController', ['$scope', 'Comment', 'Auth', '$location', function($scope, Comment, Auth, $location) {
    if (Auth.isAuth()) {
      $scope.data = {};
      $scope.data.items = [];

      $scope.commenting = false;

      Comment.getAll().then(function(data) {
        $scope.data.items = data;
      });

      $scope.submitComment = function() {
        var commentData = {};
        commentData.userName = "radelmann";
        commentData.message = $scope.data.message;

        Comment.post(commentData).then(function(data) {
          $scope.data.items.push(data); 
          $scope.commenting = false;
          $scope.data.message = "";        
        });
      };

      $scope.showSubmitForm = function() {
        $scope.commenting = true;
      }

      $scope.signOut = function() {
        Auth.signOut();
      }            

    } else {
      $location.path('/#/login');  
    }
  }]);