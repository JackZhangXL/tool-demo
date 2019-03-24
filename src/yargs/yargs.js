#!/usr/bin/env node
const yargs = require('yargs');

/* 参数基础 */
// console.log(yargs.argv);
// console.log(yargs.parse());  // 和上面等价
// node yargs.js       { _: [], '$0': 'src/yargs/yargs.js' }
// node yargs.js -a=2  { _: [], a: 2, '$0': 'src/yargs/yargs.js' }


// console.log(yargs([ '-x', '1', '-y', '2' ]).argv);
// console.log(yargs.parse([ '-x', '1', '-y', '2' ]));   // 和上面等价
// node yargs.js       { _: [], x: 1, y: 2, '$0': 'src/yargs/yargs.js' }


// console.log(yargs.array('foo').argv);
// noode yargs.js --foo foo bar       { _: [], foo: [ 'foo', 'bar' ], '$0': 'src/yargs/yargs.js' }


// const argv = yargs
//     .default('random', () => {
//         return Math.random() * 256;
//     })
//     .argv;
// console.log(argv);
// node yargs.js                { _: [], random: 250.64659976268666, '$0': 'yargs.js' }
// node yargs.js --random 24    { _: [], random: 24, '$0': 'yargs.js' }


/* 定义参数 */
// const argv = yargs
//     .alias('i', 'ingredient')
//     .describe('i', 'choose your sandwich ingredients')
//     .choices('i', ['peanut-butter', 'jelly', 'banana', 'pickles'])
//     .help('h')
//     .argv;
// console.log(argv);

// 上面这种链式调用太麻烦，可以用option方法，效果一样的
// const argv = yargs
//     .option('ingredient', {
//         alias: 'i',
//         describe: 'choose your sandwich ingredients',
//         choices: ['peanut-butter', 'jelly', 'banana', 'pickles']
//     })
//     .help('h')
//     .argv;
// console.log(argv);
// // node yargs.js -i banana      { _: [], i: 'banana', ingredient: 'banana', '$0': 'yargs.js' }


// const argv = yargs
//     .option('run', {
//         alias: 'r',
//         describe: 'run your program'
//     })
//     .option('path', {
//         alias: 'p',
//         describe: 'provide a path to file'
//     })
//     .option('spec', {
//         alias: 's',
//         describe: 'program specifications'
//     })
//     .demandOption(['run', 'path'], 'Please provide both run and path arguments to work with this tool')
//     .help()
//     .argv;
// console.log(argv);
// node yargs.js    会提示你必须要 run，path 这两个参数
// node yargs.js --run a --path b       { _: [], run: 'a', r: 'a', path: 'b', p: 'b', '$0': 'yargs.js' }
//
// 如果使用 option 来定义参数，还有一种方便的方式，直接在参数配置里将 demandOption 设为 ture
// const argv = yargs
//     .options({
//         'run': {
//             alias: 'r',
//             describe: 'run your program',
//             demandOption: true
//         },
//         'path': {
//             alias: 'p',
//             describe: 'provide a path to file',
//             demandOption: true
//         },
//         'spec': {
//             alias: 's',
//             describe: 'program specifications'
//         }
//     })
//     .help()
//     .argv;
// console.log(argv);


/* 转换 */
// const argv = yargs
//     .coerce('file', arg => {
//         return require('fs').readFileSync(arg, 'utf8');
//     })
//     .argv;
// console.log(argv);
// node yargs.js --file '../tmp/foo.js'
// { _: [], file: '// 这是一个测试用文件\nvar foo = \'foo\';', '$0': 'yargs.js' }

// const argv = require('yargs')
//     .option('user')
//     .coerce('user', opt => {
//         opt.name = opt.name.toLowerCase();
//         opt.password = '[SECRET]';
//         return opt;
//     })
//     .argv;
// console.log(argv);
// node yargs.js --user.name Batman --user.password 123
// { _: [], user: { name: 'batman', password: '[SECRET]' }, '$0': 'yargs.js' }


/* 定义命令 */
// const argv = yargs
//     .command(
//         'get',
//         'make a get HTTP request',
//         yargs => {
//             return yargs.option('u', {
//                 alias: 'url',
//                 describe: 'the URL to make an HTTP request to',
//                 default: 'http://yargs.js.org/'
//             })
//         },
//         argv => {
//             console.log(argv.url)
//         }
//     )
//     .help()
//     .argv;
// node yargs.js get                          打印出：http://yargs.js.org/
// node yargs.js get -u https://zxljack.com   打印出：https://zxljack.com


const argv = yargs
    .command({
        command: 'configure <key> [value]',
        aliases: ['config', 'cfg'],
        desc: 'Set a config variable',
        builder: yargs => yargs.default('value', 'true'),
        handler: argv => {
            console.log(`setting key:${argv.key} value:${argv.value}`);
        }
    })
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv;
// node yargs.js                    会提示报错
// node yargs.js cfg name jack      setting key:name value:jack










// if (yargs.argv.ships > 3 && yargs.argv.distance < 53.5) {
//     console.log('Plunder more riffiwobbles!');      // node src/yargs/yargs.js --ships=4 --distance=22
// } else {
//     console.log('Retreat from the xupptumblers!');  // node src/yargs/yargs.js --ships 12 --distance 98.7
// }
//
// const builder = (yargs) => {
//     yargs.positional('port', {
//         describe: 'port to bind on',
//         default: 5000
//     });
// };
//
// const handler = (argv) => {
//     if (argv.verbose) {
//         console.info(`start server on :${argv.port}`);
//     }
//     serve(argv.port);
// };
//
// (yargs.command('serve [port]', 'start the server', builder, handler).option('verbose', {
//     alias: 'v',
//     default: false
// }).argv)();
//
