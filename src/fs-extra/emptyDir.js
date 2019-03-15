const path = require('path');
const fs = require('fs-extra');

const SRC = path.resolve(__dirname, 'tmp');

// With a callback:
fs.emptyDir(SRC, err => {
    if (err) return console.error(err);
    console.log('success!');
});

// With Promises:
fs.emptyDir(SRC)
    .then(() => {
        console.log('success!');
    })
    .catch(err => {
        console.error(err);
    });

// With async/await:
async function example () {
    try {
        await fs.emptyDir(SRC);
        console.log('success!');
    } catch (err) {
        console.error(err);
    }
}

example();