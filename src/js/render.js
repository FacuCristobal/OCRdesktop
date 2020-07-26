const { createWorker } = require('tesseract.js');
var FileSaver = require('file-saver');

var files = [];

var traduccion = '';

function transcribe(){
  files.forEach(element => {
    tese(element.path);
  });
}

const worker = createWorker({
//  logger: m => console.log(m), // Add logger here
  logger: m => showProgress(m),
});

function showProgress(m) {
  $("#progbar").css("width", (m.progress * 100) + "%");
  $("#status")[0].innerHTML = m.status;
  console.log(m);
};

$("#inImage").change(function(){
  var archivos = $("#inImage")[0].files;
  var archivo = {};
  for (let i = 0; i < archivos.length; i++) {
    archivo.path = archivos[i].path;
    archivo.name = archivos[i].name;
    archivo.lang = 'spa';
    console.log(archivo);
    files[i] = archivos[i].path;
  }
  var imagen = new Image();
  imagen.src = archivos[0].path;
  mostrarImagen(imagen);
  $("#status")[0].innerHTML = "listo pa' typear";
});

function mostrarImagen(img){
  var oldImg = $("#suki img")[0];
  if (oldImg) {
    oldImg.remove();
  }
  
  $("#suki").append(img);
}



$("#typear").click(function(){
  $( "#texto" )[0].innerHTML = '';
  readImage(files[0].path, files[0].lang, files[0].name);
});

function readImage(path){
  (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
//    var { data: { text } } = await worker.recognize(path);
//    console.log(text);

    for (let index = 0; index < files.length; index++) {
      var element = files[index];
      var { data: { text } } = await worker.recognize(element);
      
      $( "#texto" ).append(text);
    }
    
    $("#status")[0].innerHTML = "Completado";
    // await worker.terminate();
  })();
};

function tese(img) {
  console.log("tese");
  Tesseract.recognize(
    img,
    'spa',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text);
  })
}



$( ".divImg" ).hover(function() {
  $( "#botong" ).fadeToggle();
},
function() {
  $( "#botong" ).fadeToggle();
}
);

function selectText(tere) {
  if (document.selection) {
      let div = document.body.createTextRange();

      div.moveToElementText(document.getElementById("texto"));
      div.select();
  }
  else {
      let div = document.createRange();
      div.setStartBefore(document.getElementById("texto"));
      div.setEndAfter(document.getElementById("texto"));
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(div);
      var res = document.execCommand('copy');
      window.getSelection().removeRange(div);
      
  }

}

$('#suki').on('dragover',function(event){
  event.preventDefault();
  event.originalEvent.dataTransfer.dropEffect = "copy"});


var dropArea = document.getElementById('suki');
var dropzone = $('#suki');

dropArea.addEventListener('dragenter', function(){
  $("#suki").css("background-color", "black");
}, false);


dropArea.addEventListener('dragleave', function(){
  $("#suki").css("background-color", "white");
}, false);

//dropArea.addEventListener('dragover', function(e){}, false);

dropzone.on('drop',function(e) {
  var archs = e.originalEvent.dataTransfer.files;

  for (let index = 0; index < archs.length; index++) {
    files.push(archs[index]);
  }

  var lang = 'spa';
  $("#status")[0].innerHTML = "listo pa' typear";

	// Now select your file upload field 
	// $('input_field_file').prop('files',files)
  });

//dropArea.addEventListener('drop', function(){
  //console.log("wepa");
  //$("#inImage").value = e.dataTransfer.files;
  //console.log(e);
//}, false);

$('#suki').click (function(){
  $('#inImage')[0].click();
} ); 

// FILESAVER

var blob = new Blob([$("#texto")[0].value], {type: "text/plain;charset=utf-8"});
//FileSaver.saveAs(blob, "transcripccion.txt");

$("#guarderia").click(() => FileSaver.saveAs(blob, "transcripccion.txt"));
