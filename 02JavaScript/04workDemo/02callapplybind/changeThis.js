function show(...args) {
    console.log(args);
    console.log(this.name);
}

Function.prototype.rCall = function (ctx, ...args) {
    let fn = Symbol(1);
    // 将方法挂载ctx上,this指向的rCall函数的调用者
    ctx[fn] = this;
    // 执行挂载的方法
    ctx[fn](...args);
    // 执行完成之后删除原方法
    delete ctx[fn];
}

show.rCall({ name: 'rCall' }, 'args1', 'args2')

Function.prototype.rApply = function (ctx, arr = []) {
    let fn = Symbol(1);
    if (arr && !(arr instanceof Array)) {
        throw ('arguments[1] not a Array');
    }
    ctx[fn] = this;
    ctx[fn](...arr);
    delete ctx[fn];
}
show.rApply({ name: 'rApply' }, ['args1', 'args2'])

Function.prototype.rBind = function (ctx, ...args1) {
    let fn = Symbol(1);
    return (...args2) => {
        ctx[fn] = this;
        ctx[fn](...args1.concat(args2))
        delete ctx[fn];
    }
}

let obind = show.rBind({ name: 'rBind' }, 'args1', 'args2')
obind('args3')




