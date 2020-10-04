var spiralOrder = function (matrix) {
    let rowLen = matrix.length;
    let columnLen = matrix[0].length;
    let len = rowLen * columnLen;
    let ans = [];
    let runTimes = rowLen - 1;
    let j;
    let i;
    for (j = 0; j < columnLen; j++) {
        ans.push(matrix[0][j]);
    }
    for (let time = 0; time < runTimes; time++) {
        for(){
            ans.push(matrix[i][j]);
        }
    }
    return ans;
};
let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let ans = spiralOrder(matrix);
console.log(ans);
// let test2 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
// let ans2 = spiralOrder(test2);
// console.log(ans2);