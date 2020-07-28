// TESSERACT //

const { createWorker } = require('tesseract.js');

function showProgress(m) { //Barra de progreso y status
  $("#progbar").css("width", (m.progress * 100) + "%");
  $("#status")[0].innerHTML = m.status;
  console.log(m);
};

function readImage(path){ //Transcripcion tesseract
  (async () => {
    const worker = createWorker({
        logger: m => showProgress(m),
      });
    await worker.load();
    await worker.loadLanguage('eng+spa');
    await worker.initialize('eng+spa');
//    var { data: { text } } = await worker.recognize(path);
//    console.log(text);

    for (let index = 0; index < files.length; index++) {
      var element = files[index];
      var { data: { text } } = await worker.recognize(element);
      
      $( "#texto" ).append(text);
    }
    
    $("#status")[0].innerHTML = "Completado";
    await worker.terminate();
  })();
};


// ------------------------------------------

var files = [];

var FileSaver = require('file-saver');

$("#inImage").change(function(){ // Carga los archivos en la variable files y muestra la primer imagen
  var archivos = $("#inImage")[0].files;
  var archivo = {};
  for (let i = 0; i < archivos.length; i++) {
    archivo.path = archivos[i].path;
    archivo.name = archivos[i].name;
    archivo.lang = 'spa';
    console.log(archivo);
    files[i] = archivos[i].path;
  }
  $("#status")[0].innerHTML = "listo pa' typear";
});

$( ".divImg" ).hover(function() {
  $( "#botong" ).fadeToggle();
},
function() {
  $( "#botong" ).fadeToggle();
}
);

function selectText() {
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



// FILESAVER

var blob = new Blob([$("#texto")[0].value], {type: "text/plain;charset=utf-8"});
//FileSaver.saveAs(blob, "transcripccion.txt");

$("#guarderia").click(() => FileSaver.saveAs(blob, "transcripcion.txt"));


// BOTONES EVENTOS
$("#typear").click(function(){ // Evento Tipear
  $( "#texto" )[0].innerHTML = '';
  readImage(files[0].path, files[0].lang, files[0].name);
});

$('#suki').click (function(){ // cuando se hace click en cualquier lugar de suki se dispara el evento click en input file
  $('#inImage')[0].click();
} ); 

$("#selec").click(function (){ // Copia el texto al portapapeles
  selectText()
});