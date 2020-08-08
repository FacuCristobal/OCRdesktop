var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var img = new Image();

function loadImg() {
	img.src = files[0];
	img.onload = function () {
		context.canvas.width = img.width;
		context.canvas.height = img.height;
		context.drawImage(img, 0, 0);
		showImg();
	};
};

//window.addEventListener('load', resize, false);
//window.addEventListener('resize', resize, false); // JQuery: $(window).resize(function() {...});

/**
 * Scale proportionally: If the width of the canvas > the height, the canvas height
 * equals the height of the browser window. Else, the canvas width equals the width of the browser window.
 * If the window is resized, the size of the canvas changes dynamically.
 */
function showImg() {
	var ancho = $("#suki").height();
	var alto = $("#suki").width();
	var ratio = canvas.width / canvas.height;
	var canvas_height = alto;
	var canvas_width = canvas_height * ratio;
	if (canvas_width > ancho) {
		canvas_width = ancho;
		canvas_height = canvas_width / ratio;
	}

	canvas.style.width = canvas_width + 'px';
	canvas.style.height = canvas_height + 'px';
}













/*var base_image = new Image();
var canvas;

var medidas = {

}

function ShowImg(index=0) {
  base_image.src = files[0];
}

base_image.onload = function(){
  medidas.alto = base_image.height,
  medidas.ancho = base_image.width
  if (canvas) {
    canvas.remove()
  }
  var canv = $('<canvas/>', { id: 'mycanvas', height: medidas.alto, width: medidas.ancho});
  $("#suki").append(canv);
  var canvas = $("#mycanvas")[0];
  context = canvas.getContext('2d');
  context.drawImage(base_image, 0, 0, medidas.ancho, medidas.alto);
  canvas.width = "100%";
};*/