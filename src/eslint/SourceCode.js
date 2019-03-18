// const SourceCode = require("eslint").SourceCode;
// const babel = require('babel-core');
//
// const code = "\uFEFFvar foo = bar;";
//
// const ast = babel.transform(code, {
//     plugins: [
//         [
//             require('../babel/babel-custom-code-filter'),
//             {
//                 debug: true,
//             },
//         ],
//     ],
// });
//
// const testCode = new SourceCode("\uFEFFvar foo = bar;", ast);
//
// assert(testCode.hasBOM === true);
// assert(testCode.text === "var foo = bar;");


const SourceCode = require("eslint").SourceCode;

const code = "var a = 1;\nvar b = 2;";

const codeLines = SourceCode.splitLines(code);  // split code into an array
console.log(codeLines);                         // [ 'var a = 1;', 'var b = 2;' ]


