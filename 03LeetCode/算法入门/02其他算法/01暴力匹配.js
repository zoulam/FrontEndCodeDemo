function searchSubStr(str, match) {
    let s = str.length;
    let l = match.length;
    for (let i = 0; i <= l - s; i++) {// i表示移动的步长
        let j;
        for (j = 0; j < s; j++) {// j 和j+i分别是短数组和长数组的比较指针
            if (str.charAt(j) != match.charAt(i + j)) {// 只要有一个不相等就移动
                break ;
            }
        }
        if (j == s) return i;

    }
    return l;
}

let longStr = 'cccccccccccccccccdaab';
let shortStr = 'aab';
let index = searchSubStr(shortStr, longStr)
console.log(index);
