const path = require('path');
const fs = require('fs-extra');

const file = path.join(__dirname, 'tmp/file.json');

// With a callback:
fs.outputJson(file, {name: 'JP'}, err => {
    console.log(err); // => null

    fs.readJson(file, (err, data) => {
        if (err) return console.error(err);
        console.log(data.name); // => JP
    });
});

// With Promises:
fs.outputJson(file, {name: 'JP'})
    .then(() => fs.readJson(file))
    .then(data => {
        console.log(data.name); // => JP
    })
    .catch(err => {
        console.error(err);
    });

// With async/await:
async function example (f) {
    try {
        await fs.outputJson(f, {name: 'JP'});
        const data = await fs.readJson(f);
        console.log(data.name); // => JP
    } catch (err) {
        console.error(err);
    }
}

example(file);