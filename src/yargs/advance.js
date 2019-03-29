#!/usr/bin/env node
const yargs = require('yargs');

// yargs.command(require('./module.js'))
//     .help()
//     .argv;
// node src/yargs/advance.js get website pro
// { _: [ 'get' ], banana: 'cool', batman: 'sad', '$0': 'src/yargs/advance.js', source: 'website', proxy: 'pro' }


// yargs.commandDir('cmds')
//     .demandCommand()
//     .help()
//     .argv;
// node src/yargs/advance.js --help
// node src/yargs/advance.js init               打印出：init called for dir .
// node src/yargs/advance.js remote --help
// node advance.js remote add jack jackurl      打印出：adding remote jack at url jackurl
// node advance.js remote prune jack tim tom    打印出：pruning remotes jack, tim, tom


// const argv = yargs
//     .config({foo: 1, bar: 2})
//     .argv;
// console.log(argv);
// node src/yargs/advance.js
// { _: [], foo: 1, bar: 2, '$0': 'src/yargs/advance.js' }


const argv = yargs
    .pkgConf('dependencies')
    .argv;
console.log(argv);
// node src/yargs/advance.js
// { _: [],
//     chalk: '^2.4.2',
//     eslint: '^5.15.1',
//     execa: '^1.0.0',
//     'fs-extra': '^7.0.1',
//     fsExtra: '^7.0.1',
//     glob: '^7.1.3',
//     'glob-promise': '^3.4.0',
//     globPromise: '^3.4.0',
//     inquirer: '^6.2.2',
//     listr: '^0.14.3',
//     rxjs: '^6.4.0',
//     split: '^1.0.1',
//     yargs: '^13.2.2',
//     '$0': 'src/yargs/advance.js' }