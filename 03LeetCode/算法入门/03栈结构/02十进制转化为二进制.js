function decTobinary(inp) {
    let stack = [];
    while (inp > 0) {
        stack.push(inp % 2);
        inp = Math.floor(inp / 2);
    }
    let ans = '';
    while (stack.length > 0) {
        ans += stack.pop();
    }
    ans = Number(ans);
    return ans;
}

console.log(decTobinary(100));
console.log(decTobinary(1000));
console.log(decTobinary(10));