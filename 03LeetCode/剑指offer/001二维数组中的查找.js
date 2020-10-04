var findNumberIn2DArray = function (matrix, target) {
    for (let i = 0; i < matrix.length; i++) {
        if (target > matrix[i][0]) {
            for (let j = 0; j < matrix[i].length; j++) {
                // console.log(j);
                if (j === matrix[i].length) j = 0;
                // console.log('xxxx:' + j);
                if (target === matrix[i][j]) {
                    return true;
                }
            }
        } else if (target === matrix[i][0]) {
            return true;
        }
    }
    return false;
};

let matrix = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
]

// console.log(matrix[2][0]);
let ans = findNumberIn2DArray(matrix, 5);
console.log(ans);