
/* jshint node: true */
/* jshint esnext: true */

/*
npm install xpath --save
npm install xmldom --save
*/

'use strict';

var fs = require('fs');
var dom = require('xmldom').DOMParser;

const DIRNAME = 'hes/';
const OUTPUTDIR = 'output/';
const DATA_FILE = 'data/data.json';

// doTest('checkout.json');

doApp();

function doApp() {
    try {
        let all = [];
        let filenames = fs.readdirSync(DIRNAME);
        filenames.forEach(function(filename) {
            console.log(">>> File "+DIRNAME + filename);
            let content = fs.readFileSync(DIRNAME + filename, 'utf-8');

            let data = onFileContent(filename, content);
            all.push({table: filename, data});
            fs.writeFileSync(OUTPUTDIR + filename, JSON.stringify(data));
            console.log("<<< File "+DIRNAME + filename);
        });

        console.log("before fs.writeFileSync(DATA_FILE");
        all.forEach(function(item) {
            fs.appendFileSync(DATA_FILE, JSON.stringify(item));
        });
        console.log("after fs.writeFileSync(DATA_FILE");

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
            let text = xml;
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
    let data = onFileContent(filename, str);
    fs.writeFileSync(OUTPUTDIR + filename, JSON.stringify(data));
}
