var reverseWords = function (s) {
    let newS = s.trim();
    let arr = newS.split(' ')
    arr.reverse();
    let newArr = arr.filter(el => el != '');
    let ans = newArr.join(' ');
    return ans;
};
let s = "a good   example";
let ans = reverseWords(s);
console.log(ans);