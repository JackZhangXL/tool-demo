const path = require('path');
const fs = require('fs-extra');

const srcpath = path.resolve(__dirname, 'dummy.js');
const dstpath = path.resolve(__dirname, 'tmp/this/path/does/not/exist/dummy.js');

const srcpath2 = path.resolve(__dirname, 'tmp/this/path/does/not/exist/dummy.js');
const dstpath2 = path.resolve(__dirname, 'dummy.js');

// With a callback:
fs.move(srcpath, dstpath, err => {
    if (err) return console.error(err);
    console.log('success!');
});

// With Promises:
fs.move(srcpath2, dstpath2)
    .then(() => {
        console.log('success!');
    })
    .catch(err => {
        console.error(err);
    });

// With async/await:
async function example (src, dest) {
    try {
        await fs.move(src, dest);
        console.log('success!');
    } catch (err) {
        console.error(err);
    }
}

example(srcpath2, dstpath2);


// fs.move(srcpath, dstpath, { overwrite: true }, err => {  // 也可以带着 option
//     if (err) return console.error(err);
//     console.log('success!');
// });