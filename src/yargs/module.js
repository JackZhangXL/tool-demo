// module.js
module.exports.command = 'get <source> [proxy]';

module.exports.describe = 'make a get HTTP request';

module.exports.builder = {
    banana: {
        default: 'cool'
    },
    batman: {
        default: 'sad'
    }
};

module.exports.handler = function (argv) {
    console.log(argv);
};