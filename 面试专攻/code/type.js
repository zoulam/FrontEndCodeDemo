function logAll(o) {
    const handler = {};
    for (const op of Object.getOwnPropertyNames(Reflect)) {
        handler[op] = (...agrs) => {
            let res;
            try {
                return res = Reflect[op](...agrs);
            } finally {
                console.log(op, ...args.slice(0, -1), '=>', result);
            }
        }
    }
    return new Proxy(o, handler)
}

logAll({})