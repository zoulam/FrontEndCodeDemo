function isObject(value) {
    const type = Object.prototype.toString.call(value);
    return type === "[object Object]";
}

function isArray(value) {
    return Array.isArray(value);
}

/**
 *
 * @param {string} content 文本内容
 * @param {number} fontSize 字体大小
 * @description 通过创建文本节点计算文本的宽度
 */
function getTextWidth(content, fontSize = 30) {
    const _span = document.createElement('span');
    _span.innerText = content;
    _span.style.fontSize = fontSize + 'px';
    _span.style.position = 'absolute';
    document.body.appendChild(_span);
    let width = _span.offsetWidth;
    document.body.removeChild(_span);
    return width;
}

/**
 *
 * @param {object} canvas canvas对象
 * @param {number} fontSize
 * @param {object} ctx
 */
function getTextPosition(canvas, fontSize, ctx) {
    let X = canvas.width;
    let Y = canvas.height * Math.random();
    // 防止越界
    if (Y < fontSize) Y = fontSize;
    if (Y > canvas.height - fontSize) Y = canvas.height - fontSize;
    ctx.x = X;
    ctx.y = Y;
}

export {
    isArray,
    isObject,
    getTextWidth,
    getTextPosition,
}