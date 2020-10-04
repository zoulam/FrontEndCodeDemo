/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
    let arr = s.split(' ');
    s = arr.join('%20')
    return s;
};

console.log(replaceSpace("We are happy."));