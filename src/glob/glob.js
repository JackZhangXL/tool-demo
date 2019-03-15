// https://github.com/isaacs/node-glob

const glob = require("glob");

// 获取src根目录下的所有js文件
glob("src/*.js", {}, (err, files) => {
     console.log(files);    // [ 'src/chalk.js', 'src/execa.js', 'src/listr.js' ]
});

// // 获取src目录下（包括子目录）的所有js文件
// glob("src/**/*.js", {}, (err, files) => {
//     console.log(files);     // 根目录和子目录里的所有js文件
// });
//
// // 获取 ch 开头的文件
// glob("src/ch*.js",function (er, files) {
//     console.log(files);  // [ 'src/chalk.js' ]
// });


// ******** Glob 类 ********
// 可以自己new一个glob对象，返回值是一个EventEmitter


// // 同步方法
// const g = new glob.Glob("src/@(ch*|ex*|li*).js", {nonull:true, matchBase:true, sync:true});
// console.log(g.found);  // [ 'src/chalk.js', 'src/execa.js', 'src/listr.js' ]

// // 事件：match，end，error，abort
// // 方法：pause，resume，abort
// const g = new glob.Glob("src/@(ch*|ex*|li*).js", {nonull:true});
//
// g.on('match', (file) => {
//     console.log(file);      // 分三次打印出：src/chalk.js  src/execa.js  src/listr.js
// });
// g.on('end', (files) => {
//     console.log(files);     // [ 'src/chalk.js', 'src/execa.js', 'src/listr.js' ]
// });
// g.on('error', (err) => {
//     console.log(err);
// });
// g.on('abort', () => {
//     console.log('abort');
// });
//
// g.pause();
// g.resume();
// g.abort();
