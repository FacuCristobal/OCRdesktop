var canvas = document.getElementById('cvs');

function ShowImg(index=0) {
  base_image = new Image();
  base_image.src = files[index];
  canvas.width = base_image.width;
  canvas.height = base_image.height;
  context = canvas.getContext('2d');
  context.drawImage(base_image, 0, 0);

}