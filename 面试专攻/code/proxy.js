var obj = new Proxy({}, {
    get: (target, propKey, receiver) => {
        console.log('run get');
        return Reflect.get(target, propKey, receiver)
    },
    set: (target, propKey, value, receiver) => {
        console.log('run set');
        return Reflect.set(target, propKey, value, receiver);
    }
});


obj.name = 'luluxi'
console.log(obj.name);