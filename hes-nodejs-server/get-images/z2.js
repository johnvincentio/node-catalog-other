var http = require('http');
var fs = require('fs');

var hertzUrl = "http://images.hertz.com/content/dam/herc/hes/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg";
hertzUrl = "http://images.hertz.com/content/dam/herc/hes/grip-equipment-rental/grip-equipment-hardware-01.jpg";

var saveFile = "save1.jpg";

var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb); // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

download(hertzUrl, saveFile);

/*
handle call back.

When file has been retrieved, then want to return that file_exists

callback function should handle the return of the localhost version of the file.

*/
