var obj = {
    a: 1,
    b: 2
}
for (var k in obj) {
    console.log(k + ':' + obj[k]);
    // a:1
    // b:2
}