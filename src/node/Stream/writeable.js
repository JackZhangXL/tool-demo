const fs = require("fs");
const path = require("path");

// 创建可读流
const readable = fs.createReadStream(path.join(__dirname, '../../tmp/data.txt'));
const writable = fs.createWriteStream(path.join(__dirname, '../../tmp/data2.txt'));

// 向提供的可写流中写入数据一百万次
// 注意背压（back-pressure）
// function writeOneMillionTimes(writable, data, encoding, callback) {
//     let i = 1000000;
//     write();
//     function write() {
//         let ok = true;
//         do {
//             i--;
//             if (i === 0) {
//                 // 最后一次。
//                 writable.write(data, encoding, callback);
//             } else {
//                 // 检查是否可以继续写入。
//                 // 不要传入 callback，因为写入还没有结束。
//                 ok = writable.write(data, encoding);
//             }
//         } while (i > 0 && ok);
//         if (i > 0) {
//             // 不得不提前停下！
//             // 当 'drain' 事件触发后继续写入。
//             writable.once('drain', write);
//         }
//     }
// }


// for (let i = 0; i < 100; i++) {
//     writable.write(`你好，#${i}!\n`);
// }
// writable.end('这是结尾\n');
// writable.on('finish', () => {
//     console.error('所有写入已完成。');
// });


// 写入 'hello ' ，并用 'world!' 来结束写入
writable.write('hello ');
writable.end('world!');
writable.on('finish', () => {
    console.error('所有写入已完成。');
});
// 后面不允许再写入数据！
// writable.write('more data');    // 报错
