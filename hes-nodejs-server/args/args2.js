function waitAndCall(func) {
    console.log(">>> waitAndCall");
    setTimeout(func, parseInt(Math.random() * 10000));
    console.log("<<< waitAndCall");
}

function doOne(par1) {
    console.log("doOne; par1 "+par1);
}

function doTwo() {
    console.log("doTwo");
}

function myFunc(param1, param2, callback1, callback2) {
    console.log(">>> myFunc");
    waitAndCall(function() {
        console.log(">>> waitAndCall callback1; param1 "+param1+" param2 "+param2);
        callback1(1);
        console.log("<<< waitAndCall callback1");
    });

    waitAndCall(function() {
        console.log(">>> waitAndCall callback2; param1 "+param1+" param2 "+param2);
        callback2();
        console.log("<<< waitAndCall callback2");
    });
    console.log("<<< myFunc");
}

myFunc('a', 'b', doOne, doTwo);
