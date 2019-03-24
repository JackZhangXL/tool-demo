console.log('arch: ', process.arch);
process.argv.forEach((val, index) => {      // 通过参数读取
    console.log(index + ': ' + val);
});
console.log('env: ', process.env);
console.log('config: ', process.config);
console.log('execArgv: ', process.execArgv);
console.log('execPath: ', process.execPath);
console.log('exitCode: ', process.exitCode);
console.log('title: ', process.title);
console.log('pid: ', process.pid);
console.log('platform: ', process.platform);
console.log('versions: ', process.versions);
console.log('release: ', process.release);


console.log('hrtime(): ', process.hrtime());
console.log('uptime(): ', process.uptime());
console.log('memoryUsage(): ', process.memoryUsage());

