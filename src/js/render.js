const { createWorker } = require('tesseract.js');

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
  var path = $("#inImage")[0].files[0].path;
  var name = $("#inImage")[0].files[0].name;
  var lang = 'spa';
  readImage(path, lang, name);
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

let dropArea = document.getElementById('suki')

dropArea.addEventListener('dragenter', function(){
  $("#suki").css("background-color", "black");
}, false);

dropArea.addEventListener('dragleave', function(){
  $("#suki").css("background-color", "white");
}, false);

//dropArea.addEventListener('dragover', handlerFunction, false)
dropArea.addEventListener('drop', function(){
  
}, false);

$('#suki').click (function(){
  $('#inImage')[0].click();
} ); 