![vue-electron搭建](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200904235445783.png)

在`webpack.web.config.js` `webpack.renderer.config.js` 添加下图的代码

![首次运行错误处理](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200905000942650.png)

```JavaScript
      templateParameters(compilation, assets, options) {
        return {
          compilation: compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options: options
          },
          process,
        };
      },
```

查询版本

`cnpm view [dependencieName] versions --json`

选择性升级`electron`的依赖版本

npx 

避免安装全局模块，使用完成就删除

调用项目内安装的模块

npm命令

`node_modules/.bin/[moduleName] --version`

npx命令简化为 `npx [moduleName] --version`

# React

`()`包裹HTML语法 `{}`JS语法

## 复用组件的方式

Hook 

​	只重用逻辑，不会返回相应的HTML文档节点

高阶组件(higher order component **HOC**)一种模式，而不是React的API

