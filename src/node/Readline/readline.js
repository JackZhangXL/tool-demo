const fs = require('fs');
const path = require('path');
const readline = require('readline');

const file = path.resolve(__dirname, '../../tmp/foo.js');

const rl = readline.createInterface({
    input: fs.createReadStream(file)
});

rl.on('line', line => {
    console.log(line);
});

