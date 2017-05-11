
print("stage 1");
var db = connect("localhost:27017/junk1");
print("stage 2");

var people = [];
var cursor = db.people.find();
while(cursor.hasNext()) {
  var obj = cursor.next();
    people.push(obj);
    printjson(obj);
}

var stories = [];
var cursor = db.stories.find();
while(cursor.hasNext()) {
  var obj = cursor.next();
    stories.push(obj);
    printjson(obj);
}

print("stage 98");
printjson(stories);

print("stage 99");
printjson(people);
print("stage 100");


