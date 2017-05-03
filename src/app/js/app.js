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
    /*var states = [
      {
        name: 'index',
        url: '/index/',
        controller: 'indexController',
        templateUrl: 'app/templates/index.html'
      },
      {
        name: 'flies',
        url: '/flies/',
        controller: 'fliesController',
        templateUrl: 'app/templates/flies.html'
      }
    ];*/
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

    /*states.forEach(function(state) {
        $stateProvider.state(state);
    });*/
}))
