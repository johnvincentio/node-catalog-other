
/*
npm install mkdirp
npm install http-request

npm rebuild --runtime=electron --target=1.3.4 --disturl=https://atom.io/download/atom-shell --abi=49


https://images.hertz.com/content/dam/herc/hes/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg

https://images.hertz.com/herc/hes/grip-equipment-rental/grip-equipment-hardware-01.jpg

http://images.hertz.com/content/dam/herc/hes/grip-equipment-rental/grip-equipment-hardware-01.jpg
http://localhost:8888/hes/src/images/grip-equipment-rental/grip-equipment-hardware-01.jpg

wget https://images.hertz.com/herc/hes/grip-equipment-rental/grip-equipment-hardware-01.jpg

*/

var port = 8888;
var host = '127.0.0.1';
var my_base = "/Users/jv/Desktop/MyDevelopment/repo_hes/brackets";
var images_base = "/Users/jv/Desktop/MyDevelopment/repo_hes/brackets/hes";

var my_http = require("http"),
    path = require("path"),
    url = require("url"),
    filesys = require("fs");
var mkdirp = require("mkdirp");
var my_http_request = require('http-request');

var server = my_http.createServer(function(request, response) {
    var my_path = decodeURI(url.parse(request.url).pathname);
    var full_path = path.join(my_base, my_path);      // default is process.cwd()
    handleGet(response, full_path, my_path, handleRequest);
}).listen (port, host, function() {
    console.log ('Server running on http://' + host + ':' + port);
});

function handleGet(response, full_path, my_path, callback) {
    console.log(">>> handleGet; full_path "+full_path+" my_path "+my_path);
    filesys.exists(full_path, function(exists) {
        var bImage = false;
        if (my_path.indexOf("/hes/src/images") > -1) {      // is an image
            bImage = true;
            var imageURL = my_path.replace("/hes/src/images",                                       "http://images.hertz.com/content/dam/herc/hes");
            console.log("imageURL :"+imageURL+":");
            if (! exists) {
                var mkdir_path = path.dirname(full_path);
                console.log("not exists full_path :"+full_path+":");
                console.log("not exists my_path :"+my_path+":");
                console.log("not exists mkdir_path :"+mkdir_path+":");
                mkdirp(mkdir_path, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log('Directory created!');
                        var options = {url: imageURL};
                        my_http_request.get(options, full_path, function (error, result) {
                            if (error) {
                                console.error(error);
                            } else {
                                console.log('File downloaded at: ' + result.file);
                            }
                            console.log("(image) handleGet; before callback");
                            if (callback) callback(response, full_path);
                            console.log("(image) handleGet; after callback");
                        });
/*
                        var file = filesys.createWriteStream(full_path);
                        var request = my_http.get(imageURL, function(response2) {
                            response2.pipe(file);
                            console.log("(image) handleGet; before callback");
                            if (callback) callback(response, full_path);
                            console.log("(image) handleGet; after callback");
                        });
*/
                    }
                });
            }
            else {
                console.log("(image exists) handleGet; before callback");
                if (callback) callback(response, full_path);
                console.log("(image exists) handleGet; after callback");
            }
        }
        else {
            // call callback here
            console.log("handleGet; before callback");
            if (callback) callback(response, full_path);
            console.log("handleGet; after callback");
        }
    });
    console.log("<<< handleGet; full_path "+full_path+" my_path "+my_path);
}

function handleRequest(response, full_path) {
    console.log(">>> handleRequest; full_path "+full_path);
    var contentType = 'text/plain';
    var ext = path.extname(full_path);
    console.log("ext :"+ext+":");
    var bImage = false;
    if (ext === '.gif') {
       contentType = 'image/gif';
        bImage = true;
    }
    else if (ext === ".jpg") {
        contentType = "image/jpeg";
        bImage = true;
    }
    else if (ext === ".png") {
        contentType = "image/png";
        bImage = true;
    }
    else if (ext === ".html") {
        contentType = "text/html";
    }
    else if (ext === ".css") {
        contentType = "text/css";
    }
    else if (ext === ".js") {
        contentType = "text/javascript";
    }
    else if (ext === ".pdf") {
        contentType = "application/pdf";
        bImage = true;
    }

    console.log("contentType "+contentType+" bImage "+bImage);
    filesys.exists(full_path, function(exists) {
        if (! exists) {
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (bImage) {
            var img = filesys.readFileSync(full_path);
            response.writeHeader(200, {'Content-Type': contentType });
            response.end(img, 'binary');
        }
        else {
            var fileToLoad = filesys.readFileSync(full_path, "utf8");
            response.writeHeader(200, {'Content-Type': contentType });
            response.write(fileToLoad);
            response.end();
        }
    });
    console.log("<<< handleRequest; full_path "+full_path);
}
/*
    filesys.exists(full_path, function(exists) {
        if (! exists) {
            response.writeHeader(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
        }
        else {
            console.log("handleRequest; before readFile; full_path "+full_path);
            filesys.readFile(full_path, "binary", function(err, file) {
                if (err) {
                    response.writeHeader(500, {
                        "Content-Type": "text/plain"
                    });
                    response.write(err + "\n");
                    response.end();
                }
                else {
                    response.writeHeader(200, {'Content-Type': contentType });
                    filesys.createReadStream(full_path, 'utf-8').pipe(response);
//                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
*/


