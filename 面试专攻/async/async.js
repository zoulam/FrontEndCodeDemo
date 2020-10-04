var fs = require('fs');

var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

var fileGen = async function () {
    var f1 = await readFile('../static/1file.txt');
    var f2 = await readFile('../static/2file.txt');
    console.log(f1.toString());
    console.log(f2.toString());
};

fileGen();