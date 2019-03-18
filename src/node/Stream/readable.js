const fs = require("fs");
const path = require("path");
const crypto = require('crypto');

const readable = fs.createReadStream(path.join(__dirname, '../tmp/data.txt'));
const writable = fs.createWriteStream(path.join(__dirname, '../tmp/data2.txt'));

// 读取一个文件，进行加密一下输出
// const hash = crypto.createHash('sha1');
// readable
//     .on('data', function (chunk) {
//         hash.update(chunk);
//     })
//     .on('end', function () {
//         console.log(hash.digest('hex'));
//     });


// readable.on('readable', () => {
//     let chunk;
//     while (null !== (chunk = readable.read())) {
//         console.log(`Received ${chunk.length} bytes of data.`);
//     }
// });


// readable.on('data', (chunk) => {
//     console.log(`Received ${chunk.length} bytes of data.`);
//     readable.pause();
//     console.log('There will be no additional data for 1 second.');
//     setTimeout(() => {
//         console.log('Now data will start flowing again.');
//         readable.resume();
//     }, 1000);
// });


// readable.pipe(writable);


// 默认情况下，当可读流触发 end 事件时，目标流也会调用 stream.end() 方法结束写入。要禁用这一默认行为， { end: false } 能让目标流保持打开
readable.pipe(writable, { end: false });
readable.on('end', () => {
    writable.end('Goodbye\n');
});
