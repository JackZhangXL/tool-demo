const semver = require('semver');

console.log(semver.valid('1.2.3'));                                         // '1.2.3'
console.log(semver.valid('a.b.c'));                                         // null
console.log(semver.clean('  =v1.2.3   '));                                  // '1.2.3'
console.log(semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3'));  // true
console.log(semver.gt('1.2.3', '9.8.7'));                                   // false
console.log(semver.lt('1.2.3', '9.8.7'));                                   // true
console.log(semver.minVersion('>=1.0.0'));                                  // '1.0.0'
console.log(semver.valid(semver.coerce('v2')));                             // '2.0.0'
console.log(semver.valid(semver.coerce('42.6.7.9.3-alpha')));               // '42.6.7'


console.log(semver.inc('1.2.3', 'prerelease', 'beta'));     // '1.2.4-beta.0'