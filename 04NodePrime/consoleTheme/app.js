const chalk = require('chalk');
let log = console.log;

// 字符串
log(chalk.red.underline('helloworld'));
log(chalk.blue.bold('helloworld'));
log(chalk.blue.bgRed('error') + ': sorry');
log(chalk.green('i love you'));
log(chalk.green('i love you,', chalk.white('so don\'t green me')));

// 模板字符串
let cat = {
    name: 'lulu',
    age: '8'
}

log(`
    名字${chalk.redBright(cat.name)}
    年龄${chalk.yellow(cat.age)}
`);

log(chalk`
    名字{redBright ${(cat.name)}}
    年龄{yellow ${(cat.age)}}
`);

// 占位符：%s
log(chalk.red('名字 %s'), cat.name);

// 主题
let error = chalk.white.bgRed;
let warn = chalk.keyword('orange');

log(error('i feel sorry'));
log(warn('warning'));