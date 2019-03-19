const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, `../../tmp/dataFs.txt`);
console.log("准备写入文件");
fs.writeFile(filePath, '我是通 过fs.writeFile 写入文件的内容', (err) => {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
    console.log("--------我是分割线-------------")
    console.log("读取写入的数据！");
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return console.error(err);
        }
        console.log("异步读取文件数据: " + data.toString());
    });
});
