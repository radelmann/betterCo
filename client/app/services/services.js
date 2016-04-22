
angular.module('betterco.services', [])

.factory('COMMENT', ['$http', function($http) {

  var getAll = function() {
    return $http({
        method: 'GET',
        url: '/api/get/'
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
        url: '/api/post/',
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
}]);