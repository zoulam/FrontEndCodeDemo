// Go.js
require('./a')
async function add(a, b) {
    let c = a + b;
    return c;
}

const muti = function (a) {
    console.log('fuck');
    return function (a) {
        return a;
    }
}

class Go {
    constructor(run) {
        this.run = run;
    }
}