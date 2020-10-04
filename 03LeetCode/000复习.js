function swap(A, i, j) {
    const t = A[i];
    A[i] = A[j];
    A[j] = t;
}

function getPivot(A, l, r) {
    const x = A[r - 1];
    let i = l - 1;

    for (let j = l; j < r - 1; j++) {
        if (A[j] <= x) {
            i++;
            swap(A, i, j);
        }
    }

    swap(A, i + 1, r - 1);

    return i + 1;
}

function qsort(A, l = 0, r) {
    r = r || A.length;

    if (l < r - 1) {
        const q = getPivot(A, l, r);
        qsort(A, l, q);
        qsort(A, q + 1, r);
    }

    return A;
}

let nums = [4, 5, 7, 9, 1, 10, 2, 8, 3, 6];
qsort(nums)
console.log(nums);