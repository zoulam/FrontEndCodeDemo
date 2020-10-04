// 挂载到 Function.prototype上更符合要求
// let slice = Array.prototype.slice;
// slice.call(obj, args)

Function.prototype.myCall = function (ctx, ...args) {
    let fn = Symbol(1);
    ctx[fn] = this;
    ctx[fn](...args);
    delete ctx[fn];
}

Function.prototype.myApply = function (ctx, arg = []) {
    let fn = Symbol(1);
    if (arg && Array.isArray(arg)) {
        throw "arguments[1] is not a Array"
    }
    ctx[fn] = this;
    ctx[fn](...arg);
    delete ctx[fn];
}



Function.prototype.myBind = function (ctx, ...args1) {
    let fn = Symbol(1);
    return (...args2) => {
        ctx[fn] = this;
        ctx[fn](...args1.concat(...args2))
        delete ctx[fn];
    }
}

function show() {
    console.log('arguments', arguments);
    console.log('this', this);
}

let obind = show.myBind({ name: 'rBind' }, 'args1', 'args2')
obind('args3')
