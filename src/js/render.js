const { createWorker } = require('tesseract.js');

var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
//FileSaver.saveAs(blob, "hello world.txt");

var files = [];


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
    files.push(archivo);
  }
  $("#status")[0].innerHTML = "listo pa' typear";
});

$("#typear").click(function(){
  files.forEach(archivo => {
    tese(archivo.path);
  });
});

function readImage(path, lang, name){
  (async () => {
    await worker.load();
    await worker.loadLanguage(lang);
    await worker.initialize(lang);
    const { data: { text } } = await worker.recognize(path);
    console.log(text);

    $( "#texto" ).append(text);
    $("#status")[0].innerHTML = "Completado";
    $("#filename").html = name;
    // await worker.terminate();
  })();
};

function tese(img) {
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
  event.originalEvent.dataTransfer.dropEffect = "copy"})

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
  var files = e.originalEvent.dataTransfer.files;

  var path = $("#inImage")[0].files = files;
  var path = $("#inImage")[0].files[0].path;
  var name = $("#inImage")[0].files[0].name;
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

