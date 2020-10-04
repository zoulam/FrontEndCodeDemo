function kmp(l, s) {
    function getNext(s) {
        let slen = s.length;
        let j = 2, t = 1;
        // let next = [0, 0, 1];
        let nextWell = [0, 0, 1];
        while (j < slen) {
            if (t == 0 || s.charAt(j - 1) == s.charAt(t - 1)) {
                // next[j + 1] = t + 1;
                if (s.charAt(j + 1) != s.charAt(t + 1))// 不等，是普通情况
                    // nextWell[j + 1] = next[j + 1];
                    nextWell[j + 1] = t + 1;
                else // 相等是特殊情况，需要重复比较，所以要跳到上一个
                    // nextWell[j + 1] = nextWell[next[j] + 1];
                    nextWell[j + 1] = nextWell[t + 1];
                j++;
                t++;
            } else {
                // t = next[t];
                t = nextWell[t];
            }
        }
        // return next;
        return nextWell;
    }
    let next = getNext(s);
    /**
     * i是主串上不会回退的比较指针
     * j是成功则往后移的指针，失败则下一步按照next数组存储的信息移动
    */
    let i = 1, j = 1;
    while (i < l.length) {// 保证不越界
        if (j == 0 || l.charAt(i - 1) == s.charAt(j - 1)) {//比对成功
            j++;
            i++;
            // console.log(i);
        } else {// 比对失败
            j = next[j];
        }
    }
    // console.log(i, j, s.length);
    // i主串中与子串完全匹配的位置 i-s.length为出现位置的头
    if (j == s.length) return i - s.length;
    else return l.length;
}



// console.log('aaaaaaaaaaaaaaaaaaab'.length);
let ans = kmp('aaaaaaaaaaaaaaaaaaab', 'aaaaaaaab')
console.log(ans);