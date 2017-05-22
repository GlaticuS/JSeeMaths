angular.module('JSeeMathsApp').controller('FLIESController', function ($scope, $document)
{
	var canvas = $document[0].getElementById('canvas');
    var context = canvas.getContext('2d');
    
	var width = canvas.width = 800;		
	var height = canvas.height = 500;

	var vm = this;
	var centerX = width/2;
	var centerY = height/2;
	var radiusX = 400;
	var radiusY = 200;
	var x,y;

    var xSpeeds = [];
    var ySpeeds = [];
    var xAngles = [];
    var yAngles = [];

    render();

    /**
    * Функция обновления canvas, в которой вычисляются скорости "мух", углы, под которыми они будут лететь,
    * что позволяет просчитать траекторию движения "мухи", перерисовывается каждый момент времени.
    */
	function render() {
		context.clearRect(0, 0, width, height);
		for(var i=0; i < vm.count; i++) {
            xSpeeds.push(Math.random()/10);
            ySpeeds.push(Math.random()/10);
            xAngles.push(Math.random());
            yAngles.push(Math.random());
			x = centerX + Math.cos(xAngles[i]) * radiusX;
			y = centerY + Math.sin(yAngles[i]) * radiusY;

            context.beginPath();
            context.arc(x, y, 5, 0, Math.PI * 2, false);
            context.fill();

            xAngles[i] += xSpeeds[i];
            yAngles[i] += ySpeeds[i];
		}
        requestAnimationFrame(render);
	}

	/*function getRandomColor() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}*/
})