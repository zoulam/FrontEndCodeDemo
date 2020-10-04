#! /usr/bin/env node
// 当前文件需要使用node环境执行


// 获取webpack.config.js 文件信息
const path = require('path');
const config = require(path.resolve('webpack.config.js'))
const Compiler = require('../lib/Compiler.js');
const compiler = new Compiler(config);
compiler.hooks.entryOption.call();

// 标识运行编译
compiler.run();

