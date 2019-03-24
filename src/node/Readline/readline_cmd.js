const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', line => {
    switch (line.trim()) {
        case 'hello':
            console.log('world');
            break;
        default:
            console.log(line.trim());
            break;
    }
});

