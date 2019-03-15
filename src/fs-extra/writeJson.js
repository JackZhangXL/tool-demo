const path = require('path');
const fs = require('fs-extra');

const file = path.resolve(__dirname, 'tmp/package.json');

// With a callback:
fs.writeJson(file, {name: 'fs-extra'}, err => {
    if (err) return console.error(err);
    console.log('success!');
});

// With Promises:
fs.writeJson(file, {name: 'fs-extra'})
    .then(() => {
        console.log('success!');
    })
    .catch(err => {
        console.error(err);
    });

// With async/await:
async function example () {
    try {
        await fs.writeJson(file, {name: 'fs-extra'});
        console.log('success!');
    } catch (err) {
        console.error(err);
    }
}

example();