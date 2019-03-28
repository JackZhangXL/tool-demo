#!/usr/bin/env node
const yargs = require('yargs');

// yargs.command(require('./module.js'))
//     .help()
//     .argv;
// node src/yargs/advance.js get website pro
// { _: [ 'get' ], banana: 'cool', batman: 'sad', '$0': 'src/yargs/advance.js', source: 'website', proxy: 'pro' }

require('yargs')
    .commandDir('cmds')
    .demandCommand()
    .help()
    .argv;
// node src/yargs/advance.js --help
// node src/yargs/advance.js init               打印出：init called for dir .
// node src/yargs/advance.js remote --help
// node advance.js remote add jack jackurl      打印出：adding remote jack at url jackurl
// node advance.js remote prune jack tim tom    打印出：pruning remotes jack, tim, tom
