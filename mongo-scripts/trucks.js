
var db = connect("localhost:27017/node-catalog");

db.trucks.remove({});

var categories = [];
var cursor1 = db.truck_categories.find().sort({_id: 1});
while(cursor1.hasNext()) {
    print('stage 10');
    var obj1 = cursor1.next();
    obj1.image_url = handleUrl(obj1.image_url);

    var packages = [];
    var cursor2 = db.truck_category_packages.find({package_category_id: obj1._id}).sort({_id: 1});
    while(cursor2.hasNext()) {
        var obj2 = cursor2.next();
        obj2.image_1_url = handleUrl(obj2.image_1_url);
        obj2.image_2_url = handleUrl(obj2.image_2_url);
        obj2.image_3_url = handleUrl(obj2.image_3_url);
        obj2.image_4_url = handleUrl(obj2.image_4_url);
        obj2.image_5_url = handleUrl(obj2.image_5_url);
        obj2.image_6_url = handleUrl(obj2.image_6_url);
        obj2.image_7_url = handleUrl(obj2.image_7_url);
        obj2.image_8_url = handleUrl(obj2.image_8_url);

        var items = [];
        var cursor3 = db.truck_category_package_items.find({package_id: obj2._id}).sort({_id: 1});
        while(cursor3.hasNext()) {
            var obj = cursor3.next();
            items.push(obj);
        }
        obj2.items = items;

        packages.push(obj2);
    }
    obj1.items = packages;

    print('stage 20');
    categories.push(obj1);
}

db.trucks.insert(categories);

print("stage 100");

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
