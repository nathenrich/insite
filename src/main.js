angular             = require('angular');
lodash              = require('lodash');
angularSimpleLogger = require('angular-simple-logger');
angularRoute        = require('angular-route');
angularResource     = require('angular-resource');
angularModalService = require('angular-modal-service');
routes              = require('./routes');
mainController      = require('./controllers/MainController');
authController      = require('./controllers/AuthController');

var app = angular.module('app', [ 'ngRoute',
                                  'ngResource',
                                  'angularModalService'
                                ]).run(function($rootScope) {

  $rootScope.authenticated = false;
  $rootScope.current_user = '';

  $rootScope.signout = function(){
      $http.get('auth/signout');
      $rootScope.authenticated = false;
      $rootScope.current_user = '';
  };
});

app.config(routes);

app.controller('mainController', ['$scope', '$rootScope', 'postService', mainController]);
app.controller('authController', ['$scope', '$http', '$rootScope', '$location', authController]);

app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

app.controller('SampleController', ["$scope", "ModalService", function($scope, ModalService) {

  $scope.showAModal = function() {

  	// Just provide a template url, a controller and call 'showModal'.
    ModalService.showModal({
      templateUrl: "yesno/yesno.html",
      controller: "YesNoController"
    }).then(function(modal) {
      // The modal object has the element built, if this is a bootstrap modal
      // you can call 'modal' to show it, if it's a custom modal just show or hide
      // it as you need to.
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.message = result ? "You said Yes" : "You said No";
      });
    });

  };

}]);
