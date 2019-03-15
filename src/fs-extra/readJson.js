const path = require('path');
const fs = require('fs-extra');

const file = path.resolve(__dirname, '../../package.json');

// With a callback:
fs.readJson(file, (err, packageObj) => {
    if (err) console.error(err);
    console.log(packageObj.version); // => 1.0.0
});

// With Promises:
fs.readJson(file)
    .then(packageObj => {
        console.log(packageObj.version); // => 1.0.0
    })
    .catch(err => {
        console.error(err);
    });

// With async/await:
async function example () {
    try {
        const packageObj = await fs.readJson(file);
        console.log(packageObj.version); // => 1.0.0
    } catch (err) {
        console.error(err);
    }
}

example();


// ******** { throws: false } ********

const file2 = path.join(__dirname, 'tmp/some-invalid.json');
const data = '{not valid JSON';

fs.writeFileSync(file2, data);

// With a callback:
fs.readJson(file2, { throws: false }, (err, obj) => {
    if (err) console.error(err);
    console.log(obj); // => null
});

// Wtih Promises:
fs.readJson(file2, { throws: false })
    .then(obj => {
        console.log(obj); // => null
    })
    .catch(err => {
        console.error(err); // Not called
    });

// With async/await:
async function example2 (f) {
    const obj = await fs.readJson(f, { throws: false });
    console.log(obj); // => null
}

example2(file2);