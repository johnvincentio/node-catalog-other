
/* jshint node: true */
/* jshint esnext: true */

/*
npm install mongodb --save
*/

'use strict';

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

MongoClient.connect("mongodb://localhost:27017/node-catalog", function(err, db) {
    if (err) {throw err;}

    db.collection('equipment').remove({}, function(err, result) {
        if (err) {throw err;}
        console.log("Remove result :"+result);

        db.collection("equipment_categories").find().sort({_id: 1}).toArray(function(err, result) {
            if (err) {throw err;}

            result.forEach((item) => {
                item.image_url = handleUrl(item.image_url);

                db.collection("equipment_category_items")
                .find({category_id: item._id})
                .sort({_id: 1})
                .toArray(function(err, result) {
                    if (err) {throw err;}

                    result.forEach((sub) => {
                        sub.image_1_url = handleUrl(sub.image_1_url);
                        sub.image_2_url = handleUrl(sub.image_2_url);
                        sub.image_3_url = handleUrl(sub.image_3_url);
                        sub.image_4_url = handleUrl(sub.image_4_url);
                        sub.image_5_url = handleUrl(sub.image_5_url);
                        sub.image_6_url = handleUrl(sub.image_6_url);
                        sub.image_7_url = handleUrl(sub.image_7_url);
                        sub.image_8_url = handleUrl(sub.image_8_url);
                    });

                    item.items = result;

                    db.collection("equipment")
                    .insert(item, function(err, result) {
                        if (err) {throw err;}
                        console.log("insert result :"+result);
                        db.close();
                    });
                });
            });
        });
    });
});

function handleUrl(url) {
    if ("undefined" === typeof url) {
        return undefined;
    }
    if (url === null) {
        return null;
    }
    if (url === "null") {
        return null;
    }
    let str = url.replace("https://images.hertz.com/content/dam/herc/hes/", "https://www.johnvincent.io/images/catalog/");
    return str;
}
