
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
		})
		.when('/about', {
			templateUrl	: 'pages/about.html',
			controller 	: 'aboutController'
		})
		.when('/contact', {
			templateUrl	: 'pages/contact.html',
			controller 	: 'contactController'
		})
		.when('/cprc-temp', {
			templateUrl	: 'pages/CPRC.html',
			controller 	: 'cprcController'
		})
		.when('/works/:workId', {
			templateUrl	: 'pages/individual.html',
			controller 	: 'individualController'
		});

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
	});

	poopoo.controller('menuController', function($scope, $http, $routeParams)
	{
        $http.get('work/work.json')
        .success(function(data) {
            $scope.work=data;
            console.log(data);
        })
        .error(function(data,status,error,config){
            console.log(data);
            $scope.contents = [{heading:"Error",description:"Could not load json   data"}];
        });

		// create a message to display inside the view
	});


	poopoo.controller('mainController', function($scope)
	{
		// create a message to display inside the view
		$scope.message = 'I look geeewwd';
	});

	poopoo.controller('aboutController', function($scope)
	{
		$scope.message = 'Mothafuckin about page using angular over here';
	});

	poopoo.controller('contactController', function($scope) {
		$scope.message = 'this is a demo so pretty much nooope';
	});

	poopoo.controller('individualController', function($scope, $http, $routeParams) {
		$scope.workId = $routeParams.workId;

	    $http.get('work/' + $routeParams.workId + '.json').success(function(data) {
	      $scope.work = data;

	      console.log(data);
	    });

	});

	poopoo.controller('cprcController', function($scope, $http) {
		$scope.title = 'Examples';
		$http.get('mainContent.json')
        .success(function(data) {
            $scope.contents=data;
            console.log(data);
        })
        .error(function(data,status,error,config){
        	console.log(data);
            $scope.contents = [{heading:"Error",description:"Could not load json data"}];
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
