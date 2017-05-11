
var db = connect("localhost:27017/node-catalog");

db.trucks.remove({});

var categories = [];
var cursor1 = db.truck_categories.find().sort({_id: 1});
while(cursor1.hasNext()) {
  var obj = cursor1.next();
    categories.push(obj);
//    printjson(obj);
}

var packages = [];
var cursor2 = db.truck_category_packages.find().sort({package_category_id: 1}).sort({_id: 1});
while(cursor2.hasNext()) {
  var obj = cursor2.next();
    packages.push(obj);
//    printjson(obj);
}

var items = [];
var cursor3 = db.truck_category_package_items.find().sort({package_id: 1}).sort({_id: 1});
while(cursor3.hasNext()) {
  var obj = cursor3.next();
    items.push(obj);
//    printjson(obj);
}

print("categories "+categories.length);
print("packages "+packages.length);
print("items "+items.length);

var jv = handleUrl('defgh');
print(jv);

//print("stage 97");
//printjson(categories);
//
//print("stage 98");
//printjson(packages);
//
//print("stage 99");
//printjson(items);

print("stage 100");

function myFunction(str) {
    print("Hello World; "+str);
}

myFunction('abc');

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
    var str = url.replace("https://images.hertz.com/content/dam/herc/hes/", "https://www.johnvincent.io/images/catalog/");
    return str;
}
