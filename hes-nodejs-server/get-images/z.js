/*
this fails
*/

var http = require('http');
var fs = require('fs');
var options = {
    hostname: 'images.hertz.com',
    port: 80,
    path: '/content/dam/herc/hes/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg',
    method: 'GET'
};
/*
https://images.hertz.com/content/dam/herc/hes/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg
*/

var file = fs.createWriteStream("my_file.jpg");

var req = http.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    res.on('data', function(d) {
        file.write(d);
    });
});
req.end();
