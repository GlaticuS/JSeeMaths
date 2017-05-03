angular.module('JSeeMathsApp').controller('GUNController', function ($scope, $document)
{
	var canvas = $document[0].getElementById('canvas');
    var context = canvas.getContext('2d');
    
	var width = canvas.width = 800;		
	var height = canvas.height = 500;

	var arrowX = width/2;
	var arrowY = height/2;
	var dx, dy;
	var angle = 0;


    render();

	function render() {
	    context.clearRect(0, 0, width, height);

	    context.save();
	    context.translate(arrowX, arrowY);
	    context.rotate(angle);

	    context.beginPath();
	    context.moveTo(20, 0);
        context.lineTo(-20, 0);
        context.moveTo(20, 0);
        context.lineTo(10, -10);
        context.moveTo(20, 0);
        context.lineTo(10, 10);
        context.stroke();

        context.restore();
        requestAnimationFrame(render);
	}

    $document[0].body.addEventListener("mousemove", function(event) {
        dx = event.clientX - arrowX;
        dy = event.clientY - arrowY;
        angle = Math.atan2(dy, dx);
    });
})