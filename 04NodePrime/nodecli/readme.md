# 简单的脚手架搭建

## 1、初始化项目并安装依赖

```bash
npm init -y #初始化npm，全部填写yes
npm install commander git-clone shelljs open #安装需要的依赖
```
`commander`:快速开发命令行

`git-clone`:克隆远程仓库

`open`:文件操作

`shelljs`**官方是这样介绍的**

>ShellJS is a portable (Windows/Linux/OS X) implementation of Unix shell commands on top of the Node.js API. You can use it to eliminate your shell script's dependency on Unix while still keeping its familiar and powerful commands. You can also install it globally so you can run it from outside Node projects - say goodbye to those gnarly Bash scripts!

机翻：
>ShellJS是在Node.js API之上的Unix shell命令的可移植（Windows / Linux / OS X）实现。您可以使用它来消除shell脚本对Unix的依赖性，同时仍然保留其熟悉且功能强大的命令。您还可以全局安装它，以便可以从Node项目外部运行它-告别那些讨厌的Bash脚本！

## 2、测试配置

`#!/usr/bin/env node  `让该文件被shell调用

```javascript
#!/usr/bin/env node    
console.log('hello world!');
```

在`package.json`

```json
  "bin": {
    "mycli": "./index.js"
  },
```

```bash
npm link #将文件进入全局执行（本次中的是index.js）
mycli #就能看到输出的helloworld
```

## 3、完成克隆、运行、全览三个功能

**这里以预览版webpack项目为例**

```javascript
#!/usr/bin/env node
const program = require('commander');
const shell = require('shelljs');
const download = require('git-clone');
const open = require('open');
const { spawn } = require('child_process')

// 定义程序版本
program.version('1.0.0');
// 定义命令
// create pro
program.command('new <name>')
    .description('create project')

    .action(name => {
        let giturl = 'https://github.com/vuejs/vue-next-webpack-preview.git';
        download(giturl, `./${name}`, () => {
            shell.rm('-rf', `${name}/.git`);//删除.git日志

            shell.cd(name);//进入项目
            shell.exec('npm install');//安装依赖


            // 控制台输出操作提示
            console.log(`
            create ${name} success ！

            cd ${name}      :enter dir
            mycli run       :run the project
            mycli start     :overview the project
            `);
        })

    })
// run proj
program.command('run')
    .description('run project')
    .action(() => {
        // shell.exec('npm run dev');
        // 组合命令,优点：能丰富控制台的功能
    
        // let cp = spawn('npm', ['run', 'dev']);
        const cp = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run',  'dev']);
    
        // 打印运行信息
        cp.stdout.pipe(process.stdout);
        cp.stderr.pipe(process.stderr);
        cp.on('close', () => {
            console.log('start proj success !');
        })
    })

// overview,打开页面预览项目
program.command('overview')
    .description('overview project')
    .action(() => {
        open(`http://localhost:8080/`)
        console.log(`overview this project `);
    })


// 解析命令行传入的参数
program.parse(process.argv)


```

## 4、常见问题

关于`spawn`能力在Windows下失效的解决方式

```bash
events.js:161
  throw er; // Unhandled 'error' event
  ^
  
Error: spawn npm ENOENT
```

[stackoverflow里给出的方案](https://stackoverflow.com/questions/43230346/error-spawn-npm-enoent)