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
        // 组合命令
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

