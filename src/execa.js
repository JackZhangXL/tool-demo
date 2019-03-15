const execa = require('execa');

// 基本用法
execa("ls").then(result => {
    console.log(result);
    // { stdout: 'node_modules\npackage.json\nsrc\nyarn.lock',
    //     stderr: '',
    //     code: 0,
    //     failed: false,
    //     killed: false,
    //     signal: null,
    //     cmd: 'ls',
    //     timedOut: false }
    console.log(result.stdout);
    // node_modules
    // package.json
    // src
    // yarn.lock
});

// 基本用法
// (async () => {
//     const {stdout} = await execa('echo', ['unicorns']);
//     console.log(stdout);     // unicorns
// })();


// 高级用法1
// (async () => {
//     // Pipe the child process stdout to the current stdout
//     execa('echo', ['unicorns111']).stdout.pipe(process.stdout);     // unicorns111
//
//     // Run a shell command
//     const {stdout} = await execa.shell('echo unicorns222');
//     console.log(stdout);    // unicorns222
//
//
//     // Catching an error
//     try {
//         await execa.shell('exit 3');
//     } catch (error) {
//         console.log(error);
//         // {
//         //     message: 'Command failed: /bin/sh -c exit 3'
//         //     killed: false,
//         //     code: 3,
//         //     signal: null,
//         //     cmd: '/bin/sh -c exit 3',
//         //     stdout: '',
//         //     stderr: '',
//         //     timedOut: false
//         // }
//     }
// })();
//
// // Catching an error with a sync method
// try {
//     execa.shellSync('exit 3');
// } catch (error) {
//     console.log(error);
//     // {
//     //     message: 'Command failed: /bin/sh -c exit 3'
//     //     code: 3,
//     //     signal: null,
//     //     cmd: '/bin/sh -c exit 3',
//     //     stdout: '',
//     //     stderr: '',
//     //     timedOut: false
//     // }
// }


// 高级用法2
// Save and pipe output from a child process
// Let's say you want to show the output of a child process in real-time while also saving it to a variable.
// const getStream = require('get-stream');
//
// const stream = execa('echo', ['foo']).stdout;
// stream.pipe(process.stdout);    // 实时输出 foo
//
// getStream(stream).then(value => {
//     console.log('child output:', value);    // child output: foo
// });