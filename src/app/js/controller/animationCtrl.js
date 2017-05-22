angular.module('JSeeMathsApp').controller('ANIMATIONController', function ($scope, $document)
{
	var canvas = $document[0].getElementById('canvas');
    var context = canvas.getContext('2d');

	var	width = canvas.width = 800;
    var height = canvas.height = 800;

    var position = [];

    var arr = [0, 0, 0, 0];
    var color = 255;

    /**
    * Функция построения фрактала. Рекурсивно запускается внутри себя.
    * @param {array} arr массив углов
    * @param {array} position хранит номер угла из массива arr для текущей глубины рекурсии (n)
    * @param {number} n глубина рекурсии
    * @param {number} x0, y0, x1, y1 координаты начальных точек
    */
    function recurs(context, arr, position, n, x0, y0, x1, y1){
      if (n==0){
      	context.fillStyle = "#" + color.toString(16);
      	color+=0.5;
        context.fillRect(x1,y1, 1,1);
        return position;
      }else{
        if (!position[n]) position[n]=0;
        var xx=Math.cos(arr[position[n]])*((x1-x0)*Math.cos(arr[position[n]])-(y1-y0)*Math.sin(arr[position[n]]))+x0;
        var yy=Math.cos(arr[position[n]])*((x1-x0)*Math.sin(arr[position[n]])+(y1-y0)*Math.cos(arr[position[n]]))+y0;
        position[n]++;
        if (position[n]==arr.length) position[n]=0;
        position=recurs(context, arr, position, n-1, x0, y0, xx, yy);
        position=recurs(context, arr, position, n-1, xx, yy, x1, y1);
        return position;
      }
    }

    update();

    /**
    * Функция обновления canvas, на которой рисуется фрактал.
    */
    function update() {
        context.clearRect(0, 0, width, height);
        context.beginPath();
		var arr2=[]
		for(var i=0; i<arr.length; i++){
			arr2[i]=arr[i]*Math.PI/180;
		}
        recurs(context, arr2, position, 15, 400, 250, 400, 550); //рекурсивная функция, рисующая фрактальную кривую
        context.stroke();

        for(i=0; i<arr.length; i++) {
            arr[i]+=1;
        }

        color=255;
        requestAnimationFrame(update);

    }
});