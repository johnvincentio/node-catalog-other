function Part(a, b) {
    this.a = a;
    this.b = b;
}

function change(myobj) {    // pass by reference
    myobj.a = "aaa";
}

var item = new Part("abcd", "efgh");
console.log("item.a "+item.a+" item.b "+item.b);

change(item);
console.log("item.a "+item.a+" item.b "+item.b);        // item.a has been changed
