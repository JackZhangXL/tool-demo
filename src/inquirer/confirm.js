'use strict';
var inquirer = require('inquirer');

// var questions = [
//     {
//         type: 'confirm',
//         name: 'toBeDelivered',
//         message: 'Is this for delivery?',
//         default: false
//     }
// ];
//
// inquirer.prompt(questions).then(answers => {
//     console.log('\nOrder receipt:');
//     console.log(JSON.stringify(answers, null, '  '));
// });

var ui = new inquirer.ui.BottomBar();

// pipe a Stream to the log zone
outputStream.pipe(ui.log);

// Or simply write output
ui.log.write('something just happened.');
ui.log.write('Almost over, standby!');

// During processing, update the bottom bar content to display a loader
// or output a progress bar, etc
ui.updateBottomBar('new bottom bar content');