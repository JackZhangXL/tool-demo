const path = require('path');
const fs = require('fs-extra');

const SRC = path.resolve(__dirname, 'tmp');

const file = `${SRC}/this/path/does/not/exist/file.txt`;

// With a callback:
fs.ensureFile(file, err => {
    console.log(err); // => null
    // file has now been created, including the directory it is to be placed in
});

// With Promises:
fs.ensureFile(file)
    .then(() => {
        console.log('success!');
    })
    .catch(err => {
        console.error(err);
    });

// With async/await:
async function example (f) {
    try {
        await fs.ensureFile(f);
        console.log('success!');
    } catch (err) {
        console.error(err);
    }
}

example(file);
