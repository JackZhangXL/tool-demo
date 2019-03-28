module.exports.command = 'init [dir]';
module.exports.desc = 'Create an empty repo';
module.exports.builder = {
    dir: {
        default: '.'
    }
};
module.exports.handler = function (argv) {
    console.log('init called for dir', argv.dir);
};
