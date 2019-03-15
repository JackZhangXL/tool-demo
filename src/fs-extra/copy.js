const path = require('path');
const fs = require('fs-extra');

const SRC = path.resolve(__dirname, '..');
const DEST = path.join(__dirname, '/tmp');

fs.copy(`${SRC}/chalk.js`, `${DEST}/chalk.js`, err => {    // 拷贝文件（用 callback）
    if (err) return console.error(err);
    console.log('success!');
});

fs.copy(`${SRC}/inquirer`, `${DEST}/inquirer`, err => {    // 拷贝文件夹
    if (err) return console.error(err);
    console.log('success!');
});

fs.copy(`${SRC}/execa.js`, `${DEST}/execa.js`)             // 拷贝文件（用 promise）
    .then(() => {
        console.log('success!');
    })
    .catch(err => {
        console.error(err);
    });

async function example () {                                // 拷贝文件（用 async/await）
    try {
        await fs.copy(`${SRC}/listr.js`, `${DEST}/listr.js`);
        console.log('success!');
    } catch (err) {
        console.error(err);
    }
}
example();

const filterFunc = (src, dest) => {                        // 用过滤器
    return /list/.test(src);  // 为 true 才拷贝
};

fs.copy(`${SRC}/listr.js`, `${DEST}/listr.js`, { filter: filterFunc }, err => {
    if (err) return console.error(err);
    console.log('success!');
});