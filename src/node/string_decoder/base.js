const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

// Buffer.from('你') => <Buffer e4 bd a0>
const str = decoder.write(Buffer.from([0xe4, 0xbd, 0xa0]));
console.log(str);  // 你



// Buffer.from('你好') => <Buffer e4 bd a0 e5 a5 bd>
let str2 = decoder.write(Buffer.from([0xe4, 0xbd, 0xa0, 0xe5, 0xa5]));
console.log(str2);  // 你

str2 = decoder.end(Buffer.from([0xbd]));
console.log(str2);  // 好
