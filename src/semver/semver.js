const semver = require('semver');

/* 基础用法 */
console.log(semver.valid('1.2.3'));        // 1.2.3
console.log(semver.valid('a.b.c'));        // null
console.log(semver.parse('1.2.3'));        // SemVer { ...raw: '1.2.3', version: '1.2.3' }

console.log(semver.major('1.2.3'));        // 1
console.log(semver.minor('1.2.3'));        // 2
console.log(semver.patch('1.2.3'));        // 3


/* prerelease tag */
console.log(semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3'));  // true
console.log(semver.satisfies('1.2.3-alpha.7', '>1.2.3-alpha.3'));           // true，当有prerelease tag时，只比较
console.log(semver.satisfies('3.4.5-alpha.9', '>1.2.3-alpha.3'));           // false，当有prerelease tag时，只比较tag的版本，所以虽然"理论上"3.4.5-alpha.9 > 1.2.3-alpha.3，仍旧返回false

console.log(semver.inc('1.2.3', 'prerelease', 'beta'));     // 1.2.4-beta.0
console.log(semver.inc('1.2.4-beta.0', 'prerelease'));      // 1.2.4-beta.1

console.log(semver.prerelease('1.2.3-alpha.1'));      // ['alpha', 1]


/* 比较API */
console.log(semver.gt('1.2.3', '9.8.7'));           // false
console.log(semver.lt('1.2.3', '9.8.7'));           // true
console.log(semver.cmp('1.2.3', '<', '9.8.7'));     // true
console.log(semver.compare('1.2.3', '9.8.7'));      // -1
console.log(semver.rcompare('1.2.3', '9.8.7'));     // 1
console.log(semver.diff('1.2.3', '9.8.7'));         // major
console.log(semver.intersects('1.2.3', '9.8.7'));   // false

/* 范围API */
console.log(semver.minVersion('>=1.0.0'));                  // 1.0.0

console.log(semver.clean('  =v1.2.3   '));                                  // 1.2.3，忽略=v
console.log(semver.valid(semver.coerce('v2')));                             // 2.0.0
console.log(semver.valid(semver.coerce('42.6.7.9.3-alpha')));               // 42.6.7
