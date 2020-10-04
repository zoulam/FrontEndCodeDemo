/**
 *
 * @param {object} obj
 */
function objToArray(obj) {
    return [...Object.values(obj)];
}

/**
 *
 * @param {object} obj
 */
function objToArray1(obj) {
    return Object.keys(obj).map(key => obj[key]);
}

/**
 *
 * @param {object} obj
 * @description 只能格式化伪数组
 */
function objToArray2(obj) {
    return Array.from(obj);
}


/**
 *
 * @param {object} origin 原始值
 * @param {object} target
 * @description 实现数组和对象的深拷贝
 */
function deepClone(origin, target = {}) {
    let toStr = Object.prototype.toString,
        arrType = '[object Array]';
    for (const key in origin) {
        if (origin.hasOwnProperty(key)) {
            if (typeof (origin[key]) === 'object' && origin[key] !== null) {
                if (toStr.call(origin[key]) === arrType) {
                    target[key] = [];
                } else {
                    target[key] = {};
                }
                deepClone(origin[key], target[key]);
            } else {
                target[key] = origin[key];
            }
        }
    }
    return target;
}

/**
 *
 * @param {object} obj
 * @description 只支持 JSON支持的数据类型拷贝
 * @alias fuck
 */
function deepClone1(obj) {
    return JSON.parse(JSON.stringify(obj));
}




