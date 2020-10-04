let inherit = (function () {
    let Temp = function () { };
    return function inherit(Children, Father) {
        Temp.prototype = Father.prototype;
        Children.prototype = new Temp();
        Children.prototype.constructor = Children;
        Children.prototype.superClass = Father;
    }
})();


function father(){

}

function children(){

}