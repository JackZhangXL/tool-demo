module.exports.command = 'remote <command>';
module.exports.desc = 'Manage set of tracked repos';
module.exports.builder = function (yargs) {
    return yargs.commandDir('remote_cmds');
};
module.exports.handler = function (argv) {};
