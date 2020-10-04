var reverseLeftWords = function (s, n) {
    let ans = '';
    for (let i = 0; i < n; i++) {
        ans += s.charAt(i)
    }
    let beforeAns = s.replace(ans, '');
    ans = beforeAns + ans;
    return ans;
};


let ans = reverseLeftWords("lrloseumgh", 6)
console.log(ans);