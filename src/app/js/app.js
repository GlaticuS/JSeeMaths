(function(){

})(angular.module('JSeeMathsApp', [
    'ui.router',
    'ngResource',
    'ui.bootstrap' 
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$urlRouterProvider.otherwise("/");
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $stateProvider
    .state('index', {
      url: "/index/",
      templateUrl: "app/templates/index.html"
    })
    .state('flies', {
      url: "/flies/",
      controller: "FLIESController",
      controllerAs: "flies",
      templateUrl: "app/templates/flies.html"
    })
    .state('gun', {
      url: "/gun/",
      controller: "GUNController",
      controllerAs: "gun",
      templateUrl: "app/templates/gun.html"
    })
    .state('fractal', {
      url: "/fractal/",
      controller: "FRACTALController",
      controllerAs: "fractal",
      templateUrl: "app/templates/fractal.html"
    })
    .state('fracAnimation', {
      url: "/fracanimation/",
      controller: "ANIMATIONController",
      controllerAs: "animation",
      templateUrl: "app/templates/fracAnimation.html"
    })

}))
