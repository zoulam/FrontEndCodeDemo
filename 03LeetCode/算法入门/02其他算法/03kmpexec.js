function kmp(l, s) {
    function getNext(s) {
        let next = [0, 0, 1];
        let j = 2; let t = 1;
        while (j < s.length) {
            if (t == 0 || s.charAt(j - 1) == s.charAt(t - 1)) {
                next[j + 1] = t + 1;
                j++;
                t++;
            } else {
                t = next[t];
            }
        }
        return next;
    }

    let next = getNext(s);
    let i = 1, j = 1;
    while (i < l.length) {
        if (j == 0 || s.charAt(j - 1) == l.charAt(i - 1)) {
            j++;
            i++;
        } else {
            j = next[j];
        }
    }
    if (j == s.length) return i - s.length;
    else return i;
}

let l = 'aaaaaaaaaaaaaaaaaaaaaaaaaaab'
let s = 'aaaab'
console.log(l.length,s.length);
let ans = kmp(l, s);
console.log(ans);