
/*
within the hes applicartion
*/
var imageUrl = "/content/dam/herc/hes/misc/enUS/promo-banner_port-power.jpg";

var localUrl = imageUrl.replace("/content/dam/herc", "http://localhost:8888");
console.log("localUrl :"+localUrl+":");

/*
within the nodejs server.
Gets the request for an image, create the url from Herz image server
*/
var hertzUrl = localUrl.replace("http://localhost:8888", "https://images.hertz.com/herc");
console.log("hertzUrl :"+hertzUrl+":");

// https://images.hertz.com/herc/hes/equipment-rental/Air-Compressors/C185-Silo-1.jpg

// /Users/jv/Desktop/MyDevelopment/repo_hes/brackets/hes/src/images/equipment-rental/Articulating-Boomlifts/E400AJP-App-1.jpg

// handle mkdir

var baseDir = "/Users/jv/Desktop/MyDevelopment/repo_hes/brackets/hes/src/images";
var newurl = imageUrl.replace("/content/dam/herc/hes", baseDir);
console.log("newurl :"+newurl+":");


var baseUrl = "/Users/jv/Desktop/MyDevelopment/repo_hes/brackets/hes/src/images";

/*
/Users/jv/Desktop/MyDevelopment/repo_hes/brackets/hes/src/images/hes/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg

https://images.hertz.com/content/dam/herc/hes/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg

*/
var a1 = "/Users/jv/Desktop/MyDevelopment/repo_hes/brackets/hes/src/images/hes/homepage/hertz-entertainment-equipment-vehicle-rental-986.jpg";
var b1 = a1.indexOf("/src/images/hes");
console.log("b1 "+b1);
if (b1 > -1) {
    var a2 = a1.replace("/Users/jv/Desktop/MyDevelopment/repo_hes/brackets/hes/src/images/",
                       "https://images.hertz.com/content/dam/herc/");
    console.log("a2 :"+a2+":");
}
var c1 = a1.indexOf("/src2/images/hes");
console.log("c1 "+c1);
