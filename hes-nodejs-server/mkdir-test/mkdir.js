var mkdirp = require('mkdirp');

var my_dir = "food/abc";

mkdirp(my_dir, function (err) {
    if (err) {
        console.error(err);
    }
    else console.log('Directory created!');
});
