
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


  return {
    getAll: getAll
  };
}]);