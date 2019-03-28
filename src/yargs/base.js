#!/usr/bin/env node
const yargs = require('yargs');

/* 参数基础 */
// console.log(yargs.argv);
// console.log(yargs.parse());  // 和上面等价
// node base.js       { _: [], '$0': 'src/yargs/yargs.js' }
// node base.js -a=2  { _: [], a: 2, '$0': 'src/yargs/yargs.js' }


// console.log(yargs([ '-x', '1', '-y', '2' ]).argv);
// console.log(yargs.parse([ '-x', '1', '-y', '2' ]));   // 和上面等价
// node base.js       { _: [], x: 1, y: 2, '$0': 'src/yargs/yargs.js' }


// console.log(yargs.array('foo').argv);
// noode yargs.js --foo foo bar       { _: [], foo: [ 'foo', 'bar' ], '$0': 'src/yargs/yargs.js' }


// const argv = yargs
//     .default('random', () => {
//         return Math.random() * 256;
//     })
//     .argv;
// console.log(argv);
// node base.js                { _: [], random: 250.64659976268666, '$0': 'yargs.js' }
// node base.js --random 24    { _: [], random: 24, '$0': 'yargs.js' }


/* 定义参数 */
// const argv = yargs
//     .alias('i', 'ingredient')
//     .describe('i', 'choose your sandwich ingredients')
//     .choices('i', ['peanut-butter', 'jelly', 'banana', 'pickles'])
//     .demandOption(['i'], '-i is require')
//     .help('h')
//     .fail((msg, err, yargs) => {
//         if (err) throw err;
//         console.error('请输入参数 -i');
//         console.error(msg);
//         console.error('参数释义 \n', yargs.help());
//         process.exit(1);
//     })
//     .argv;
// console.log(argv);

// 上面这种链式调用太麻烦，可以用option方法，效果一样的
// const argv = yargs
//     .option('ingredient', {
//         alias: 'i',
//         describe: 'choose your sandwich ingredients',
//         choices: ['peanut-butter', 'jelly', 'banana', 'pickles'],
//         demandOption: true
//     })
//     .help('h')
//     .fail((msg, err, yargs) => {
//         if (err) throw err;
//         console.error('请输入参数 -i');
//         console.error(msg);
//         console.error('参数释义 \n', yargs.help());
//         process.exit(1);
//     })
//     .argv;
// console.log(argv);
// // node base.js -i banana      { _: [], i: 'banana', ingredient: 'banana', '$0': 'yargs.js' }


/* 转换 */
// const argv = yargs
//     .coerce('file', arg => {
//         return require('fs').readFileSync(arg, 'utf8');
//     })
//     .argv;
// console.log(argv);
// node base.js --file '../tmp/foo.js'
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
// node base.js --user.name Batman --user.password 123
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
// node base.js get                          打印出：http://yargs.js.org/
// node base.js get -u https://zxljack.com   打印出：https://zxljack.com


// const argv = yargs
//     .command({
//         command: 'configure <key> [value]',
//         aliases: ['config', 'cfg'],
//         desc: 'Set a config variable',
//         builder: yargs => yargs.default('value', 'true'),
//         handler: argv => {
//             console.log(`setting key:${argv.key} value:${argv.value}`);
//         }
//     })
//     .demandCommand(1, 'You need at least one command before moving on')
//     .help()
//     .argv;
// node base.js                    会提示报错
// node base.js cfg name jack      setting key:name value:jack


// const argv = yargs
//     .command('run <port> <guid>', 'run the server', yargs => {
//         yargs.positional('guid', {
//             describe: 'a unique identifier for the server',
//             type: 'string'
//         })
//     }).argv;
// console.log(argv);
// node src/yargs/base.js run 8080 abcd
// { _: [ 'run' ], '$0': 'src/yargs/base.js', port: 8080, guid: 'abcd' }


// const argv = yargs
//     .command('get <username|email> [password]', 'fetch a user by username or email.')
//     .help()
//     .argv;
// console.log(argv);
// node src/yargs/base.js get jack aaa
// { _: [ 'get' ], '$0': 'src/yargs/base.js', username: 'jack', email: 'jack', password: 'aaa' }


// const argv = yargs
//     .command('download <url> [files..]', 'download several files')
//     .help()
//     .argv;
// console.log(argv);
// node src/yargs/base.js download www.abc.com  bb.js cc.png
// { _: [ 'download' ], '$0': 'src/yargs/base.js', url: 'www.abc.com', files: [ 'bb.js', 'cc.png' ] }


// const mwFunc1 = argv => console.log('第一个中间件');
// const mwFunc2 = argv => console.log('第二个中间件');
//
// const argv = yargs
//     .command('get', '自定义命令', {}, argv => {
//         console.log('执行命令');
//     })
//     .middleware([mwFunc1, mwFunc2])
//     .argv;
// node base.js get
// 第一个中间件
// 第二个中间件
// 执行命令

// const argv = yargs
//     .middleware(function (argv) {
//         if (process.env.HOME) argv.home = process.env.HOME
//     }, true)
//     .command('configure-home', "do something with a user's home directory",
//         {
//             'home': {
//                 'demand': true,
//                 'string': true
//             }
//         },
//         function(argv) {
//             console.info(`用户目录是： ${argv.home}`);
//         }
//     )
//     .argv;
// node base.js configure-home
// 用户目录是： /Users/jack



/* 其他 */

