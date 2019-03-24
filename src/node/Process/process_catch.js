// 该记录能反映出 promise 何时 reject，何时处理 reject
const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, p) => {
    unhandledRejections.set(p, reason);
});
process.on('rejectionHandled', p => {
    unhandledRejections.delete(p);
});


// 演示 uncaughtException
process.on('uncaughtException', err => {
    console.log(`Caught exception: ${err}`);
});

setTimeout(() => {
    console.log('This will still run.');
}, 500);

nonexistentFunc();
console.log('This will not run.');
// Caught exception: ReferenceError: nonexistentFunc is not defined
// This will still run.