// 在n秒内触发不再执行且重新计时
// 减少用户过多的网络请求

/**
 *
 * @param {function} fn
 * @param {number} time ms
 * @param {boolean} triggleNow true：首次不防抖 false：首次防抖
 */

function debounce(fn, time = 1000, triggleNow = true) {
    let t = null,
        res
    let debounced = function () {
        let _this = this,
            args = arguments;

        if (t) {
            clearTimeout(t);
        }

        // 首次触发
        if (triggleNow) {
            let exec = !t;
            t = setTimeout(() => {
                t = null;
            }, time);
            if (exec) {
                res = fn.apply(_this, args);
            }
            // 首次不触发
        } else {
            t = setTimeout(() => {
                res = fn.apply(_this, args);
            }, time);
        }
        return res;
    }

    debounced.remove = function () {
        clearTimeout(t);
        t = null;
    }

    return debounced;
}

// n秒内只触发一次
/**
 *
 * @param {function} fn
 * @param {number} delay ms
 */
function throttle(fn, delay) {
    let t = null,
        begin = Date.now();
    return function () {
        let _this = this,
            args = arguments,
            cur = Date.now();
        clearTimeout(t);
        if (begin - cur >= delay) {
            fn.apply(_this, args);
            begin = cur;
        } else {
            setTimeout(() => {
                fn.apply(_this, args);
            }, delay)

        }
    }
}

/**
 *  return randomRGBColor
 */
function randomColor() {
    function random() {
        return Math.floor(Math.random() * 256).toString();
    }
    return `rgb(${random()},${random()},${random()})`
}




// export {
//     debounce,
//     throttle,
// }