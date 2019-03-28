module.exports.command = 'add <name> <url>';
module.exports.desc = 'Add remote named <name> for repo at url <url>';
module.exports.builder = {};
module.exports.handler = function (argv) {
    console.log('adding remote %s at url %s', argv.name, argv.url);
};