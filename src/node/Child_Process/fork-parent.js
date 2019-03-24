const path = require('path');
const child_process = require('child_process');

console.log('parent pid: ' + process.pid);

const child = child_process.fork(path.join(__dirname, 'fork-child.js'));

console.log('fork return pid: ' + child.pid);

child.on('message', msg => {
    console.log('parent get message: ' + JSON.stringify(msg));
});
child.send({key: 'parent value'});
// node src/node/Child_Process/fork-parent.js
// parent pid: 31797
// fork return pid: 31798
// child pid: 31798
// child get message: {"key":"parent value"}
// parent get message: {"key":"child value"}