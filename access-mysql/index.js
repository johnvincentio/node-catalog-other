
/* jshint node: true */
/* jshint esnext: true */

/*
npm install mysql --save
*/

'use strict';

var fs = require('fs');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hes',
  password : 'hes',
  database : 'hes_db'
});

connection.connect();

const OUTPUT_DIR = 'output/';
const SCHEMA_DIR = 'schemas/';

let tables = [];
connection.query('SHOW TABLES', function(err, rows) {
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
//            let careful = (item === "hes_locations") || (item === "cinelease_locations");
            let result = "";
            for (var idx in rows) {
                var row = rows[idx];
                row._id = row.id;
                delete row.id;
                result += JSON.stringify(row);
            }
            let table = updateTableName(item);

            let outfile = OUTPUT_DIR+table+'.json';
            console.log('Creating file '+outfile);
            fs.writeFileSync(outfile, result);
        });

        connection.query('SHOW COLUMNS FROM '+item, function(err, cols) {
            let str = '';
            let table = updateTableName(item);
            let result =`const ${table}Schema = mongoose.Schema({\n`;
            cols.forEach(function(col) {
                console.log(col);
                let field = col.Field === 'id' ? "_id": col.Field;
                let type = updateColumnType(col.Type);
                let required = `${col.Null}` === "NO";
                str += `\t${field}: {type: ${type}, required: ${required}},\n`;
            });
            result += `${str}}, {collection: '${table}'});`;

            let schemafile = SCHEMA_DIR+table+'.js';
            console.log('Creating file '+schemafile);
            fs.writeFileSync(schemafile, result);
        });
    });
    connection.end();
});

function updateColumnType(type) {
    if (type.includes('int(')) {
        return 'Number';
    }
    if (type.includes('bigint(')) {
        return 'Number';
    }
    if (type.includes('varchar(')) {
        return 'String';
    }
}

function updateTableName(table) {
    let update = table.replace("hes_locations", "locations1")
    .replace("cinelease_locations", "locations2")
    .replace("hes_", "")
    .replace("cinelease_", "");
    return update;
}
