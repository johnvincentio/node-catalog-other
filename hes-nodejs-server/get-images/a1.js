/*
ref:
http://stackoverflow.com/questions/5294470/writing-image-to-local-server

npm install http-request
*/


var hertzUrl = "";
var saveFile = "";

hertzUrl = "http://images.hertz.com/content/dam/herc/hes/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg";

// hertzUrl = "http://images.hertz.com/content/dam/herc/hes/grip-equipment-rental/grip-equipment-hardware-01.jpg";

// hertzUrl = "http://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon.png?v=c78bd457575a";

saveFile = "file2.jpg";

var http = require('http-request');
var options = {url: hertzUrl};
http.get(options, saveFile, function (error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log('File downloaded at: ' + result.file);
    }
});
