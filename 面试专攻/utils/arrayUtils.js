/**
 *
 * @param {} arr array
 */
function unique(arr) {
    return [...new Set(arr)]
}

/**
 *
 * @param {} arr array
 */
function unique1(arr) {
    arr.sort((a, b) => a - b);
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] == arr[i + 1]) {
            arr.splice(i + 1, 1)
            i--;
        }
    }
    return arr;
}



/**
 *
 * @param {} arr array
 */
function flatten(arr) {
    let obj = { ...arr };
    return obj;
}


/**
 *
 * @param {} arr array
 * @item {object}
 */
function flatten2(arr) {
    return arr.reduce((map, item) => {
        map[item.id] = item
        return map
    }, {})
}

/**
 *
 * @param {} arr array
 */
function flat(arr) {
    let res = [];
    arr.map(item => {
        if(Array.isArray(item)) {
            res = res.concat(...item);
        } else {
            res.push(item);
        }
    });
    return res;
}

/**
 *
 * @param {} arr array
 */
function flat2(arr) {
    return arr.reduce((result, item)=> {
        return result.concat(Array.isArray(item) ? flat2(item) : item);
    }, []);
}
console.log(flat2([1, [2, 3, 4], [111, 222]]));



