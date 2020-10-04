var isAnagram = function (s, t) {
    // 此处的sort可以直接根据UTF-16码顺序排序
    return s.split('').sort().join('') === t.split('').sort().join('');
};

let s = "anagram", t = "nagaram";
console.log(isAnagram(s, t));