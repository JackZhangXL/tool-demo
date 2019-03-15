const path = require('path');
const fs = require('fs-extra');

const file = path.join(__dirname, 'tmp/file.txt');

// With a callback:
fs.outputFile(file, 'hello!', err => {
    console.log(err); // => null

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) return console.error(err);
        console.log(data); // => hello!
    })
});

// With Promises:
fs.outputFile(file, 'hello2!')
    .then(() => fs.readFile(file, 'utf8'))
    .then(data => {
        console.log(data); // => hello2!
    })
    .catch(err => {
        console.error(err);
    });

// With async/await:
async function example (f) {
    try {
        await fs.outputFile(f, 'hello3!');
        const data = await fs.readFile(f, 'utf8');
        console.log(data); // => hello3!
    } catch (err) {
        console.error(err);
    }
}

example(file);