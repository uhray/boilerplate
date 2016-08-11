define(
[
'angular', 'jquery', 'lodash', 'text!./template.html'
],
function(angular, $, _, template) {

  return {
    controller: go,
    template: template
  }

  // Our controller function  --------------------------------------------------

  function go($scope) {
    $scope.timestamp = new Date();

    setInterval(function() {
      $scope.timestamp = new Date();
      $scope.$apply();
    }, 1000);
  }
});
