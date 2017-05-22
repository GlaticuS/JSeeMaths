angular.module('JSeeMathsApp').controller('GUNController', function ($scope, $document, $window, vector, particle, utils)
{
	var canvas = $document[0].getElementById('canvas');
    var context = canvas.getContext('2d');
   
	var	width = canvas.width = $window.innerWidth;
	var	height = canvas.height = $window.innerHeight;
	var	gun = {
			x: 100,
			y: height,
			angle: -Math.PI / 4
		};
	var	cannonball = particle.create(gun.x, gun.y, 15, gun.angle, 0.2);
	var	isShooting = false;
	var	forceAngle = 0;
	var	forceSpeed = 0.1;
	var	rawForce = 0;
	var	target = {};
	var score = 0;

	cannonball.radius = 7;

	setTarget();
	update ();

    /**
    * Устанавливает местоположение цели в случайном месте карты.
    */
	function setTarget() {
		target.x = utils.randomRange(200, width);
		target.y = utils.randomRange(200, height);
		target.radius = utils.randomRange(10, 40);
	}

	$document[0].body.addEventListener("mousedown", onMouseDown);

	$document[0].body.addEventListener("keydown", function(event) {
		switch(event.keyCode) {
			case 32: // space
				if(!isShooting) {
					shoot();
				}
				break;

			default:
				break;
		}
	});


    /**
    * Функция выстрела, просчитывает скорость пули и её координаты.
    */
	function shoot() {
		var force = utils.map(rawForce, -1, 1, 2, 20);
		cannonball.x = gun.x + Math.cos(gun.angle) * 40;
		cannonball.y = gun.y + Math.sin(gun.angle) * 40;
		cannonball.vx = Math.cos(gun.angle) * force;
		cannonball.vy = Math.sin(gun.angle) * force;

		isShooting = true;
	}

    /**
    * Обновление canvas, что позволяет видеть движение на ней.
    */
	function update() {
		if(!isShooting) {
			forceAngle += forceSpeed;
		}
		rawForce = Math.sin(forceAngle);
		if(isShooting) {
			cannonball.update();
			checkTarget();
		}
		draw();

		if(cannonball.y > height) {
			isShooting = false;
		}
		requestAnimationFrame(update);
	}

    /**
    * Обработка столкновения пули с целью - прибавка к счёту и новое местоположение цели.
    */
	function checkTarget() {
		if(utils.circleCollision(target, cannonball)) {
			score++;
			setTarget();
		}
	}

	function onMouseDown(event) {
		$document[0].body.addEventListener("mousemove", onMouseMove);
		$document[0].body.addEventListener("mouseup", onMouseUp);
		aimGun(event.clientX, event.clientY);
	}

	function onMouseMove(event) {
		aimGun(event.clientX, event.clientY);
	}

	function onMouseUp(event) {
		$document[0].body.removeEventListener("mousemove", onMouseMove);
		$document[0].body.removeEventListener("mouseup", onMouseUp);
		aimGun(event.clientX, event.clientY);
	}

    /**
    * Функция изменения угла дула пушки, при помощи зажатия мыши и ее движения.
    * @param {number} mouseX, mouseY координаты мыши 
    */
	function aimGun(mouseX, mouseY) {
		gun.angle = utils.clamp(Math.atan2(mouseY - gun.y, mouseX - gun.x), -Math.PI / 2, -0.3);
	}

    /**
    * Отрисовка всех элементов игры, пушки, счетчика усиления, цели.
    */
	function draw() {
		context.clearRect(0, 0, width, height);

        context.fillStyle = "black"
        context.font="20px Georgia";
        context.fillText("Очки: " + score,10,50);

		context.fillStyle = "#ccc";
		context.fillRect(10, height - 10, 20, -200);

        var grd=context.createLinearGradient(10,height-10,20,400);
        grd.addColorStop(0,"green");
        grd.addColorStop(0.5, "yellow");
        grd.addColorStop(1,"red");

		context.fillStyle = grd;
		context.fillRect(10, height - 10, 20, utils.map(rawForce, -1, 1, 0, -200));

		context.fillStyle = "#000";

		context.beginPath();
		context.arc(gun.x, gun.y, 24, 0, Math.PI * 2, false);
		context.fill();

		context.save();
		context.translate(gun.x, gun.y);
		context.rotate(gun.angle);
		context.fillRect(0, -8, 40, 16);
		context.restore();

		context.beginPath();
		context.arc(cannonball.x,
					cannonball.y,
					cannonball.radius,
					0, Math.PI * 2, false);
		context.fill();

		context.fillStyle = "red";
		context.beginPath();
		context.arc(target.x, target.y, target.radius, 0, Math.PI * 2, false);
		context.fill();
    }

})