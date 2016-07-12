
// script.js

	// create the module and name it poopoo
	var poopoo = angular.module('poopoo', [
    'portfolioServices',
    'ngSanitize'
	]);

	poopoo.config(function($routeProvider, $locationProvider)
	{

		$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html',
			controller	: 'mainController'
		});

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
	});

	poopoo.controller('menuController', function($scope, $http, $routeParams)
	{
      
	});


	poopoo.controller('mainController', function($scope)
	{
		// create a message to display inside the view
		$scope.message = 'I look geeewwd';
	});

	poopoo.controller('individualController', function($scope, $http, $routeParams) {
		$scope.workId = $routeParams.workId;

	    $http.get('work/' + $routeParams.workId + '.json').success(function(data) {
	      $scope.work = data;

	      console.log(data);
	    });

	});

		/*Add portfolio services*/
	var portfolioServices = angular.module('portfolioServices', ['ngResource']);
	portfolioServices.factory('Items', ['$resource',
	  function($resource){
	    return $resource('work/:workId.json', {}, {
	      query: {method:'GET', params:{workId:'work'}, isArray:true}
	    });
	}]);

  poopoo.run(['$location', function poopoorun($location) {
    debugger; // -->> here i debug the $location object to see what angular see's as URL
  }]);
