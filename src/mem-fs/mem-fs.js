const path = require('path');
const memFs = require("mem-fs");
const editor = require("mem-fs-editor");

const store = memFs.create();
const fs = editor.create(store);

const srcFile = path.resolve(__dirname, '../tmp/data2.txt');
const srcJson = path.resolve(__dirname, '../../package.json');
const destTpl = path.resolve(__dirname, '../tmp/dataMemFs.tpl');
const destJson = path.resolve(__dirname, '../tmp/dataMemFs.json');

console.log(fs.read(srcFile));                                      // hello world!
console.log(fs.read(srcFile, { raw: true }));                       // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64 21>
console.log(fs.read('somefile.txt', { defaults: '文件不存在' }));    // 文件不存在

console.log(fs.readJSON(srcJson));

fs.write(destTpl, "<%= value %>");
fs.writeJSON(destJson, JSON.parse(JSON.stringify({ name: "tool-demo" })));

fs.append(destTpl, "<%= value2 %>", { separator: '\r\n----\r\n' });
fs.extendJSON(destJson, JSON.parse(JSON.stringify({ description: "some tool demo" })));


fs.copy(destTpl, path.join(__dirname, '../tmp/mem-fs/dataMemFs.tpl'));

fs.copyTpl(destTpl, path.join(__dirname, '../tmp/mem-fs/dataMemFs.txt'), {
    value: 1,
    value2: 2
});

fs.move(path.join(__dirname, '../tmp/mem-fs/dataMemFs.tpl'), destTpl);

// fs.delete(path.join(__dirname, '../tmp/mem-fs/dataMemFs.txt'));

console.log(fs.exists(destTpl));    // true

fs.commit(() => {});

