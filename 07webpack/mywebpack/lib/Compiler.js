const fs = require('fs');
const path = require('path');
const process = require('process');
const babylon = require('babylon');
const t = require('@babel/types');
// 用es6语法导出的需要加上default,否则引入的就是对象
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const ejs = require('ejs')
const { SyncHook } = require('tapable')
class Compiler {
    /**
     *
     * @param {new Obejct} config 配置文件对象
     */
    constructor(config) {
        // 包含entry 和 output 等参数
        this.config = config;
        // 保存文件入口的路径
        this.entryId;// './src/index.js'
        // 保存模块依赖
        this.modules = {};
        this.entry = config.entry;// 入口路径
        // cwd code work dirname 命令运行的路径
        this.root = process.cwd();
        // 添加声明周期函数
        this.hooks = {
            entryOption: new SyncHook(),
            Compiler: new SyncHook(),
            afterCompiler: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done:new SyncHook(),
        }
        let plugins=this.config.plugins
        if(Array.isArray(plugins)){
            plugins.forEach(plugin=>{
                plugin.apply(this);
            })
        }
        this.hooks.afterPlugins.call();
    }

    /**
     *
     * @param {*} modulePath 源代码模块路径
     */
    getSource(modulePath) {
        // 取出每一个规则做处理
        let rules = this.config.module.rules;
        let content = fs.readFileSync(modulePath, 'utf-8');
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            let { test, use } = rule;
            let len = use.length - 1;
            if (test.test(modulePath)) {
                function normalLoader() {
                    // 取出loader代码
                    let loader = require(use[len--]);
                    // 递归调用loader,直到取完为止
                    content = loader(content)
                    if (len >= 0) {
                        normalLoader();
                    }
                }
                normalLoader();
            }
        }
        return content;
    }


    /**
     *
     * @param {*} source 源码
     * @param {*} parentPath 父路径
     * @description AST解析语法树
     */
    parse(source, parentPath) {
        let ast = babylon.parse(source);
        let dependencies = [];// 依赖数组
        traverse(ast, {
            CallExpression(p) {
                let node = p.node;
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value;
                    // 添加js后缀
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js')
                    moduleName = './' + path.join(parentPath, moduleName);
                    dependencies.push(moduleName);
                    // 替换节点修改源码
                    node.arguments = [t.stringLiteral(moduleName)];
                }
            }
        });
        let sourceCode = generator(ast).code;
        return { sourceCode, dependencies }
    }

    /**
     *
     * @param {string} modulePath 工作路径
     * @param {boolean} isEntry 是否是入口
     */
    buildModule(modulePath, isEntry) {
        // 拿到模块内容(代码)
        let source = this.getSource(modulePath);
        // 获取相对路径 即this.root 到模块的路径 ./src\index.js
        let moduleName = './' + path.relative(this.root, modulePath);

        if (isEntry) {
            // 将主入口的路径保存到entryId
            this.entryId = moduleName;
        }
        // 解析需要改造source代码 返回一个依赖列表
        // path.dirname(moduleName) ./src
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
        this.modules[moduleName] = sourceCode;
        dependencies.forEach(dep => {
            // 实现递归加载除外部依赖
            this.buildModule(path.join(this.root, dep), false);
        });
    }

    /**
     * 发送编译文件
     */
    emitFile() {
        // 打包后的文件路径
        let mian = path.join(this.config.output.path, this.config.output.filename);
        // 获取代码模板路径和字符串
        let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
        let code = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules })
        // 资源（打包后的文件）
        this.assest = [];
        // 路径对应的代码
        this.assest[mian] = code;
        fs.writeFileSync(mian, this.assest[mian]);
    }

    run() {
        this.hooks.run.call();
        this.hooks.Compiler.call();
        // 执行并创建模块的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true);
        this.hooks.afterCompiler.call();
        // 发射打包后的文件
        this.emitFile()
        this.hooks.emit.call();
        this.hooks.done.call();
    }
}

module.exports = Compiler;