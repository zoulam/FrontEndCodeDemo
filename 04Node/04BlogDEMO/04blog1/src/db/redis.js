const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', err => {
    console.error(err);
});

function set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    redisClient.set(key, value, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            if (val === null) {
                resolve(null);
                return
            }

            // json格式解析成对象，字符串直接返回，
            // 此处不是为了处理异常
            try {
                resolve(JSON.parse(value));
            } catch (error) {
                resolve(value);
            }
        });
    })
    return promise;
}

module.exports = {
    set,
    get
}