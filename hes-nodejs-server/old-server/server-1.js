/*
var http = require('http');
var host = '127.0.0.1';
var port = '9000';

var server = http.createServer(function (req, res) {
    res.writeHead (200, { 'Content-Type' : 'text/html'});
    res.write ('<h1>Hello World! </h1>');
    setTimeout(function() {
        res.end ('<h2>goodbye </h2>');
        console.log("world");
    }, 5000);
}).listen (port, host, function() {
    console.log ('Server running on http://' + host + ':' + port);
});

npm start
curl http://localhost:9000
*/

var port = 8888;
var host = '127.0.0.1';
var my_base = "/Users/jv/Desktop/MyDevelopment/repo_hes/brackets";
var images_base = "/Users/jv/Desktop/MyDevelopment/repo_hes/brackets/hes";

var my_http = require("http"),
    path = require("path"),
    url = require("url"),
    filesys = require("fs");
/*
404 full_path :/Users/jv/Desktop/MyDevelopment/repo_hes/brackets/hes/src/images/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg:
404 my_path :/hes/src/images/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg:
b1 0
imageURL :https://images.hertz.com/content/dam/herc/hes/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg:
*/

/*
https://images.hertz.com/content/dam/herc/hes/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg
*/

var server = my_http.createServer(function(request, response) {
    var my_path = url.parse(request.url).pathname;
    var full_path = path.join(my_base, my_path);      // default is process.cwd()

/*
see if images file,
if true,
see if already exists, if true => skip the rest
get the file from hertz server
when finished,
then check if exists,
if not, return 404
else
get the file and return it
*/
    filesys.exists(full_path, function(exists) {
        if (! exists) {
            console.log("404 full_path :"+full_path+":");
            console.log("404 my_path :"+my_path+":");

            var b1 = my_path.indexOf("/hes/src/images");
            console.log("b1 "+b1);
            if (b1 > -1) {
                var imageURL = my_path.replace("/hes/src/images",
                                   "https://images.hertz.com/content/dam/herc/hes");
                console.log("imageURL :"+imageURL+":");
            }

            response.writeHeader(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
        }
        else {
            filesys.readFile(full_path, "binary", function(err, file) {
                if (err) {
                    response.writeHeader(500, {
                        "Content-Type": "text/plain"
                    });
                    response.write(err + "\n");
                    response.end();
                }
                else {
                    response.writeHeader(200);
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
}).listen (port, host, function() {
    console.log ('Server running on http://' + host + ':' + port);
});

/*

var myImage = "http://images.hertz.com/content/dam/herc/hes/misc/enUS/promo-banner_port-power.jpg";

getData(myImage, writeData, 1, 'abc', true);

document.getElementById('image').innerHTML += "show this before data ...";

function getData(dataURI, callback) {
    var myData = getSomeData(dataURI); // fake function
    callback(myData);
}

function writeData(myData, par1, par2, par3) {
    document.getElementById('output').innerHTML += par1;
    document.getElementById('output').innerHTML += par2;
    document.getElementById('output').innerHTML += par3;
}

function getSomeData() {
    // this would make an XHR connection to the server and get, say, some JSON back
    var data = 'this is data from the server';
    return data;
}

function getImage() {
    console.log(">>> getImage; name " + name + " path " + path);
    var that = this;
    var request = $.ajax( {
        url : path,
        type : "get",
        dataType : "json",
        async : false
    });
    request.done (function(data) {
        console.log ("HES.Content:load; done; name "+name);
        that.storage[name] = data.content; // only want the content portion
    });
    request.fail (function(jqXHR, textStatus) {
//			console.log ("HES.Content:load; name "+name+" Request failed: " + textStatus);
    });
    console.log("<<< getImage; name " + name);
}

*/
