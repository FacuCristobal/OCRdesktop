const { createWorker } = require('tesseract.js');

const worker = createWorker({
//  logger: m => console.log(m), // Add logger here
  logger: m => showProgress(m),
});

function showProgress(m) {
  $("#progbar")[0].value = m.progress * 100;
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

    $( "p" ).append( "<span>" + text +"</span>" );
    $("#filename").html = name;
    await worker.terminate();
  })();
};
