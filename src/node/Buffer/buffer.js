// 创建 Buffer 类
const buf1 = Buffer.alloc(10);      // 创建一个长度为 10、且用 0 填充的 Buffer
console.log(buf1);                  // <Buffer 00 00 00 00 00 00 00 00 00 00>

const buf2 = Buffer.alloc(10, 1);   // 创建一个长度为 10、且用 0x1 填充的 Buffer
console.log(buf2);                  // <Buffer 01 01 01 01 01 01 01 01 01 01>

// 创建一个长度为 10、且未初始化的 Buffer，比 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，因此需要使用 fill() 或 write() 重写
const buf3 = Buffer.allocUnsafe(10);        // <Buffer 60 4f 80 cb d5 14 00 00 b8 4f>
console.log(buf3);

const buf4 = Buffer.from([1, 2, 3]);        // 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer
console.log(buf4);

const buf5 = Buffer.from('tést');           // 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer
console.log(buf5);

const buf6 = Buffer.from('tést', 'latin1'); // 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer
console.log(buf6);

const buf7 = Buffer.from('hello jack', 'ascii');
console.log(buf7.toString('hex'));       // 68656c6c6f206a61636b
console.log(buf7.toString('base64'));    // aGVsbG8gamFjaw==


// 写入数据
const buf8 = Buffer.alloc(256);
const len = buf8.write("hello jack2");
console.log("写入字节数 : "+  len);      // 写入字节数 : 11


// 读取数据
const buf9 = Buffer.alloc(26);
for (let i = 0 ; i < 26 ; i++) {
    buf9[i] = i + 97;
}
console.log(buf9.toString('ascii'));         // abcdefghijklmnopqrstuvwxyz
console.log(buf9.toString('ascii', 0, 5));   // abcde
console.log(buf9.toString('utf8', 0, 5));    // abcde
console.log(buf9.toString(undefined, 0, 5)); // abcde


// 将 Buffer 转换为 JSON 对象
const buf10 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf10);
console.log(json);     // {"type":"Buffer","data":[1,2,3,4,5]}

const copy = JSON.parse(json, (key, value) => {
    return value && value.type === 'Buffer' ?
        Buffer.from(value.data) :
        value;
});
console.log(copy);  // <Buffer 01 02 03 04 05>


// 缓冲区合并
const buffer1 = Buffer.from(('测试'));
const buffer2 = Buffer.from(('jack'));
const buffer3 = Buffer.concat([buffer1, buffer2]);
console.log(buffer3.toString());    // 测试jack


// 缓冲区比较
const buffer4 = Buffer.from('ABC');
const buffer5 = Buffer.from('ABCD');
const result = buffer4.compare(buffer5);

if(result < 0) {
    console.log(buffer4 + " 在 " + buffer5 + "之前");  // ABC 在 ABCD 之前
} else if(result === 0){
    console.log(buffer4 + " 与 " + buffer5 + "相同");
} else {
    console.log(buffer4 + " 在 " + buffer5 + "之后");
}


// 拷贝缓冲区
const buffer6 = Buffer.from('abcdefghijkl');
const buffer7 = Buffer.from('RUNOOB');

buffer7.copy(buffer6, 2);           //将 buffer7 插入到 buffer6 指定位置上
console.log(buffer6.toString());    // abRUNOOBijkl


// 缓冲区裁剪
const buffer8 = Buffer.from('hello jack');
const buffer9 = buffer8.slice(0, 2);
console.log(buffer9.toString());    // he
