const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));
console.log(argv);
// node src/minimist/minimist.js -a beep -b boop
// { _: [], a: 'beep', b: 'boop' }

// node src/minimist/minimist.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
// { _: [ 'foo', 'bar', 'baz' ], x: 3, y: 4, n: 5, a: true, b: true, c: true, beep: 'boop' }


const params = 'one two three -- four five --six'.split(' ');
// [ 'one', 'two', 'three', '--', 'four', 'five', '--six' ]

const argv2 = minimist(params, { string: true });
console.log(argv2);
// node src/minimist/minimist.js
// { _: [ 'one', 'two', 'three', 'four', 'five', '--six' ] }

const argv3 = minimist(params, { '--': true });
console.log(argv3);
// node src/minimist/minimist.js
// { _: [ 'one', 'two', 'three' ], '--': [ 'four', 'five', '--six' ] }