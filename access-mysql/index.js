
/* jshint node: true */
/* jshint esnext: true */

/*
npm install mysql --save
*/

'use strict';

const OUTPUTDIR = 'output/';

var fs = require('fs');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hes',
  password : 'hes',
  database : 'hes_db'
});

connection.connect();

let tables = [];
connection.query('SHOW TABLES', function(err, rows, fields) {
//    console.log(rows);
    for (var idx in rows) {
        tables.push(rows[idx].Tables_in_hes_db);
    }
    tables.forEach(function(item) {
        console.log(item);

        let sql = 'select * from ' + item;
//        console.log("sql :"+sql);
        connection.query(sql, function(err, rows){
            if (err) {
                throw err;
            }
            console.log('\nData received from '+item);
            let result = "";
            for (var idx in rows) {
                var row = rows[idx];
                var str = JSON.stringify(row);
                result += str;
//                console.log(str);
            }
            console.log('Creating file '+OUTPUTDIR+item+'.json');
            fs.writeFileSync(OUTPUTDIR + item+'.json', result);
        });
    });
    connection.end();
});
