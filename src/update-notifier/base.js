const updateNotifier = require('update-notifier');

updateNotifier({
    pkg: {
        name: 'chalk',
        version: '2.4.0'
    },
    updateCheckInterval: 0
}).notify();

// const pkg = require('../../package.json');
//
// updateNotifier({ pkg }).notify();
