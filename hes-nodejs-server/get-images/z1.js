/*
this works
*/

var http = require('http');
var fs = require('fs');

var hertzUrl = "";

hertzUrl = "http://images.hertz.com/content/dam/herc/hes/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg";

hertzUrl = "http://images.hertz.com/content/dam/herc/hes/grip-equipment-rental/grip-equipment-hardware-01.jpg";

hertzUrl = "http://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon.png?v=c78bd457575a";

// http://images.hertz.com/content/dam/herc/hes/grip-equipment-rental/grip-equipment-hardware-01.jpg

var file = fs.createWriteStream("file2.jpg");
var request = http.get(hertzUrl, function(response) {
    response.pipe(file);
});


