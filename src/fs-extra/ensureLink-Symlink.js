const path = require('path');
const fs = require('fs-extra');

const srcpath = path.resolve(__dirname, 'copy.js');
const dstpath = path.resolve(__dirname, 'tmp/this/path/does/not/exist/copy.js');


// ******** ensureLink ********

// // With a callback:
// fs.ensureLink(srcpath, dstpath, err => {
//     console.log(err); // => null
//     // link has now been created, including the directory it is to be placed in
// });
//
// // With Promises:
// fs.ensureLink(srcpath, dstpath)
//     .then(() => {
//         console.log('success!');
//     })
//     .catch(err => {
//         console.error(err);
//     });
//
// // With async/await:
// async function example(src, dest) {
//     try {
//         await fs.ensureLink(src, dest);
//         console.log('success!');
//     } catch (err) {
//         console.error(err);
//     }
// }
//
// example(srcpath, dstpath);


// ******** ensureSymlink ********

// With a callback:
fs.ensureSymlink(srcpath, dstpath, err => {
    console.log(err); // => null
    // symlink has now been created, including the directory it is to be placed in
});

// With Promises:
fs.ensureSymlink(srcpath, dstpath)
    .then(() => {
        console.log('success!');
    })
    .catch(err => {
        console.error(err);
    });

// With async/await:
async function example (src, dest) {
    try {
        await fs.ensureSymlink(src, dest);
        console.log('success!');
    } catch (err) {
        console.error(err);
    }
}

example(srcpath, dstpath);
