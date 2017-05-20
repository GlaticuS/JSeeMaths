angular.module('JSeeMathsApp').controller('SPRINGSController', function ($scope, $document, vector, $window, particle)
{
	var canvas = $document[0].getElementById('canvas');
    var context = canvas.getContext('2d');

    update();

    function update() {
    	context.clearRect(0, 0, width, height);


    	requestAnimationFrame(update);
    }
})