const loaderUtils = require('loader-utils');
const validate = require('schema-utils');// 校验配置参数
const fs = require('fs');
module.exports = function (source) {
    // this.cacheable(flase) // 不使用缓存，不建议，消耗内存大
    this.cacheable && this.cacheable(); // 只有第一次使用缓存，函数的默认值是true
    let options = loaderUtils.getOptions(this);
    let cb = this.async();
    let schema = {
        type: 'object',
        properties: {
            text: { type: 'string' },
            filename: { type: 'string' }
        }
    }
    validate(schema, options, 'banner-loader');
    // 给定模板
    if (options.filename) {
        this.addDependency(options.filename);// 添加依赖，这样就能被webpack watch到
        fs.readFile(options.filename, 'utf-8', function (err, data) {
            cb(err, `/**${data}**/${source}`)
        })
        // 只给定了文本
    } else {
        cb(null, `/**${options.text}**/${source}`)
    }
}