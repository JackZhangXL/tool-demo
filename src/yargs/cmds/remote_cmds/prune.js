module.exports.command = 'prune <name> [names..]';
module.exports.desc = 'Delete tracked branches gone stale for remotes';
module.exports.builder = {};
module.exports.handler = function (argv) {
    console.log('pruning remotes %s', [].concat(argv.name).concat(argv.names).join(', '));
};
