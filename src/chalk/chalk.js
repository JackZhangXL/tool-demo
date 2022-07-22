// https://github.com/chalk/chalk

// 常见例子
import chalk from 'chalk';

const log = console.log;

log(chalk.blue('Hello') + ' World' + chalk.red('!'));            // 设颜色
log(chalk.blue.bgRed.bold('Hello world!'));                      // 也可以设背景色，加粗
log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));  // 参数支持字符串数组

log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));  // 支持嵌套使用，下划线

// ES6写法
log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);
// ES6写法
log(chalk`
CPU: {red 90%}
RAM: {green 40%}
DISK: {rgb(255,131,0) 70%}
`);

log(chalk.keyword('orange')('Yay for orange colored text!'));       // 指定颜色名
log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));  // 自定义颜色
log(chalk.hex('#DEADED').bold('Bold gray!'));                       // 自定义颜色


// // 自定义主题
// const chalk = require('chalk');
//
// const error = chalk.bold.red;
// const warning = chalk.keyword('orange');
//
// console.log(error('Error!'));
// console.log(warning('Warning!'));