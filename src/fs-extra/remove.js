const path = require('path');
const fs = require('fs-extra');

const file = path.join(__dirname, 'tmp/chalk.js');
const dic = path.join(__dirname, 'tmp/this');

// remove file
// With a callback:
fs.remove(file, err => {
    if (err) return console.error(err);
    console.log('success!');
});

fs.remove(dic, err => {
    if (err) return console.error(err);
    console.log('success!');
});

// With Promises:
fs.remove(file)
    .then(() => {
        console.log('success!');
    })
    .catch(err => {
        console.error(err);
    });

// With async/await:
async function example (src, dest) {
    try {
        await fs.remove(file);
        console.log('success!');
    } catch (err) {
        console.error(err);
    }
}

example();