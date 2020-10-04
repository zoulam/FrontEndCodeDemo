/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    // 过滤长度不是偶数
    const n = s.length;
    if (n % 2 === 1) {
        return false;
    }

    // 创建Map以键值对的形式存入右括号和左括号
    const pairs = new Map([[')', '('], [']', '['], ['}', '{']]);
    // 把数组当成栈结构
    const stack = [];
    // string转换为数组
    s.split('').forEach(key => {
        if (pairs.has(key)) {
            // !stack.length 即当栈为空时为ture
            // 或者右括号无法与栈顶左括号匹配时
            if (!stack.length || stack[stack.length - 1] !== pairs.get(key)) {
                return false;
            }
            // 将左括号压入栈中，若是有对应的右括号，则取出栈中对应的左括号
            stack.pop();//出栈
        }
        else {
            stack.push(key);//入栈
        }
    });
    // 栈中的所有内容被取出则为true
    return !stack.length;
};
// @lc code=end

console.log(isValid("()[]{}"));
