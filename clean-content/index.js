
/* jshint node: true */
/* jshint esnext: true */

/*
npm install xpath --save
npm install xmldom --save
*/

'use strict';

var fs = require('fs');
var xpath = require('xpath'), dom = require('xmldom').DOMParser;

const DIRNAME = 'hes/';
const OUTPUTDIR = 'output/';

// doTest('checkout.json');

doApp();

function doApp() {
    try {
        fs.readdir(DIRNAME, function(err, filenames) {
            if (err) {
                console.error("readdir error");
                return;
            }
            filenames.forEach(function(filename) {
                console.log(">>> File "+DIRNAME + filename);
                fs.readFile(DIRNAME + filename, 'utf-8', function(err, content) {
                    if (err) {
                        console.error("readfile error; file "+DIRNAME + filename);
                        return;
                    }
                    let result = onFileContent(filename, content);
                    fs.writeFileSync(OUTPUTDIR + filename, JSON.stringify(result));
                    console.log("<<< File "+DIRNAME + filename);
                });
            });
        });
    }
    catch (e) {
        console.log('Error:', e.stack);
    }
}

function onFileContent(filename, content) {
    console.log(">>> onFileContent; filename "+filename);
    let record = JSON.parse(content);
    let obj = record.content;

    let arr = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
//            console.log(key, obj[key]);
            let xml = obj[key];
            let text = "";
            if (xml !== "" && xml.includes("<dcs:content")) {
                var doc = new dom().parseFromString(xml);
                text = doc.firstChild.firstChild.data;
            }
            arr[key] = text;
        }
    }
    console.log("<<< onFileContent; filename "+filename);
    return arr;
}

function doTest(filename) {
    var str = fs.readFileSync(DIRNAME + filename, 'utf8');
    let result = onFileContent(filename, str);
    fs.writeFileSync(OUTPUTDIR + filename, JSON.stringify(result));
}
