/**
 * @description 无副作用原型继承
 */
let inherit = (function () {
    let Mid = function () { };
    return function (Father, Children) {
        Mid.prototype = Father.prototype;
        Children.prototype = new Mid();
        Children.prototype.constructor = Children;
        Children.prototype.super_class = Father;
    }
})();


/**
 * @description 子类能够修改父类的原型
 */
function Father() {
    this.name = 'luluxi'
}
function Children() {
    Father.call(this);
}

Children.prototype = new Father;
Children.prototype.constructor = Children;
Father.prototype.name = "luluxi"
let children = new Children();
console.log(children.name);