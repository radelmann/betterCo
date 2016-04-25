angular.module('betterco.comment', [])
  .controller('CommentController', ['$scope', 'ModalService', 'Comment', 'Auth', '$location', function($scope, ModalService, Comment, Auth, $location) {
    if (Auth.isAuth()) {
      $scope.data = {};
      $scope.data.items = [];

      Comment.getAll().then(function(data) {
        $scope.data.items = data;
      });

      $scope.submitComment = function(message) {
        var commentData = {};
        commentData.userName = "radelmann";//to do get from local storage
        commentData.message = message;

        Comment.post(commentData).then(function(data) {
          $scope.data.items.push(data);
          $scope.commenting = false;
          $scope.data.message = "";
        });
      };

      $scope.showSubmitForm = function() {
        ModalService.showModal({
          templateUrl: "app/comment/commentForm.html",
          controller: "ModalController"
        }).then(function(modal) {

          modal.element.modal();

          modal.close.then(function(result) {
            $scope.submitComment(result);
          });
        });
      }

      $scope.signOut = function() {
        Auth.signOut();
      }

    } else {
      $location.path('/#/login');
    }
  }]);