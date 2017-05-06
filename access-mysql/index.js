
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
    for (var idx in rows) {
        tables.push(rows[idx].Tables_in_hes_db);
    }
    tables.forEach(function(item) {
        console.log(item);

        let sql = 'select * from ' + item;
//        console.log("sql :"+sql);
        connection.query(sql, function(err, rows) {
            if (err) {
                throw err;
            }
            console.log('\nData received from '+item);
            let careful = (item === "hes_locations") || (item === "cinelease_locations");
            let result = "";
            for (var idx in rows) {
                var row = rows[idx];
                if (careful) {
                    delete row.id;
                }
                result += JSON.stringify(row);
            }
            let table = item.replace("hes_locations", "locations_1")
                .replace("cinelease_locations", "locations_2")
                .replace("hes_", "")
                .replace("cinelease_", "");

            let outfile = OUTPUTDIR+table+'.json';
            console.log('Creating file '+outfile);
            fs.writeFileSync(outfile, result);
        });
    });
    connection.end();
});
