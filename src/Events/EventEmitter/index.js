const EventEmitter = require( './eventEmitter.js');

const emitter = new EventEmitter();

function callback1(name) {
    console.log(`I am ${name}`);
}
function callback2(name) {
    console.log(`${name} is fool`);
}
function callback3(name) {
    console.log(`${name} is clever`);
}

emitter.addListener('person', callback1);
emitter.addListener('person', callback2);
emitter.addListener('person', callback3);

emitter.removeListener('person', callback2);

emitter.emit('person', 'jack');
