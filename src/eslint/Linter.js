const Linter = require("eslint").Linter;
const linter = new Linter();

const messages1 = linter.verify("var foo", {
    rules: {
        semi: 2     // 2 - 开启规则，级别为 error，触发时会导致程序退出
    }
});
console.log(messages1);
// [
//     {
//         ruleId: 'semi',
//         severity: 2,
//         message: 'Missing semicolon.',
//         line: 1,
//         column: 8,
//         nodeType: 'VariableDeclaration',
//         fix: { range: [Array], text: ';' }
//     }
// ]
const messages2 = linter.verifyAndFix("var foo", {
    rules: {
        semi: 2
    }
});
console.log(messages2);     // { fixed: true, messages: [], output: 'var foo;' }

// console.log(linter.getRules());     // 所有eslint的规则
// console.log(Linter.version);