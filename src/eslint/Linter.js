const Linter = require("eslint").Linter;
const linter = new Linter();

console.log(linter.getRules());     // 所有eslint的规则
console.log(Linter.version);

// const messages1 = linter.verify("var foo;", {
//     rules: {
//         semi: 2
//     }
// }, { filename: "foo.js" });
// console.log(messages1);


// or using SourceCode
// const SourceCode = require("eslint").SourceCode;
//
// const code = new SourceCode("var foo = bar;", ast);
//
// const messages2 = linter.verify(code, {
//     rules: {
//         semi: 2
//     }
// }, { filename: "foo.js" });
// console.log(messages2);


// const messages3 = linter.verifyAndFix("var foo", {
//     rules: {
//         semi: 2
//     }
// });
// console.log(messages3);



