const events = require('events');

const eventEmitter = new events.EventEmitter();   // 创建 eventEmitter 对象

eventEmitter.on('connection', () => {
    console.log('连接成功');
    eventEmitter.emit('data_received');     // 触发 data_received 事件
});

eventEmitter.on('data_received', () => {
    console.log('数据接收成功');
});

eventEmitter.emit('connection');

console.log("程序执行完毕");
// 连接成功
// 数据接收成功
// 程序执行完毕


// emit 支持任意多个参数
const emitter = new events.EventEmitter();
emitter.on('someEvent', (arg1, arg2) => {
    console.log('listener1', arg1, arg2);
});
emitter.on('someEvent', (arg1, arg2) => {
    console.log('listener2', arg1, arg2);
});
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
// listener1 arg1 参数 arg2 参数
// listener2 arg1 参数 arg2 参数


// 应该始终为 error 事件注册 listener
emitter.on('error', (err) => {
    console.error('有错误');
});
emitter.emit('error', new Error('whoops!'));
// 有错误，如果上面没有注册 error，这里 node 进程会崩溃

