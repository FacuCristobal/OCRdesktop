var canvas = document.getElementById('cvs');

    canvas.width = $("#suki").width();
    canvas.height = $("#suki").height();

context = canvas.getContext('2d');

$(window).resize(function(){
    console.log("aeasdawe");
    canvas.width = $("#suki").width();
    canvas.height = $("#suki").height();   
});

function ShowImg()
{
  base_image = new Image();
  base_image.src = files[0];
  context.drawImage(base_image, 0, 0);
}