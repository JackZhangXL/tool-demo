const path = require('path');
const fs = require('fs-extra');

const file = path.join(__dirname, 'tmp/asdfghjk.txt');

// With a callback:
fs.pathExists(file, (err, exists) => {
    console.log(err); // => null
    console.log(exists); // => false
})

// Promise usage:
fs.pathExists(file)
    .then(exists => console.log(exists)); // => false

// With async/await:
async function example (f) {
    const exists = await fs.pathExists(f);
    console.log(exists); // => false
}

example(file);