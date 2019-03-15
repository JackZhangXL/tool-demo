const path = require('path');
const fs = require('fs-extra');

const SRC = path.resolve(__dirname, 'tmp');

const dir = `${SRC}/this/path/does/not/exist`;
const desiredMode = 0o2775;
const options = {
    mode: 0o2775
};

// With a callback:
fs.ensureDir(dir, err => {
    console.log(err); // => null
    // dir has now been created, including the directory it is to be placed in
});

// With a callback and a mode integer
fs.ensureDir(dir, desiredMode, err => {
    console.log(err); // => null
    // dir has now been created with mode 0o2775, including the directory it is to be placed in
});

// With Promises:
fs.ensureDir(dir)
    .then(() => {
        console.log('success!');
    })
    .catch(err => {
        console.error(err);
    });

// With Promises and a mode integer:
fs.ensureDir(dir, desiredMode)
    .then(() => {
        console.log('success!');
    })
    .catch(err => {
        console.error(err);
    });

// With async/await:
async function example (directory) {
    try {
        await fs.ensureDir(directory);
        console.log('success!');
    } catch (err) {
        console.error(err);
    }
}
example(dir);

// With async/await and an options object, containing mode:
async function exampleMode (directory) {
    try {
        await fs.ensureDir(directory, options);
        console.log('success!');
    } catch (err) {
        console.error(err);
    }
}
exampleMode(dir);