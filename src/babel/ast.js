// const babel = require('@babel/core');
//
// // 我们将 var a = 1;  var b = 2;
// // 装换成 var a = 2;  var b = 1;
// const code = ` var a = 1; var b = 2 `;
// const ast = babel.transform(code, {
//     plugins: [
//         [
//             require('./babel-custom-code-filter'),
//             {
//                 debug: true,
//             },
//         ],
//     ],
// });
//
// console.log(ast.code);
//
//
// // 我们将 require.context('../mock-server/api', true, /\.js(on)?$/);
// // 装换成 (function () {});
// const code2 = ` require.context('../mock-server/api', true, /\\.js(on)?$/); `;
// const ast2 = babel.transform(code2, {
//     plugins: [
//         [
//             require('./babel-custom-code-transform'),
//             {
//                 debug: true,
//             },
//         ],
//     ],
// });
//
// console.log(ast2.code);


const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;
const babelTypes = require('@babel/types');
const babelGenerate = require('@babel/generator').default;

// 我们将 var a = 1;  var b = 2;
// 装换成 var a = 2;  var b = 1;
const code = ` var a = 1; var b = 2 `;
const ast = babelParser.parse(code);

babelTraverse(ast, {
    enter(path) {
        const node = path.node;
        // console.log(node);
        if (babelTypes.isVariableDeclarator(node, { type: 'VariableDeclaration' })) {
            if (babelTypes.isIdentifier(node, { name: 'a' })) {
                console.log('a', node);
            }
            if (babelTypes.isNumericLiteral(node, { value: 1 })) {
                console.log('1', node);
            }
        }
        if (babelTypes.isIdentifier(node, { name: 'a' })) {
            console.log('a', node);
        }
        if (babelTypes.isNumericLiteral(node, { value: 1 })) {
            console.log('1', node);
        }
        // babelTypes.variableDeclaration('VariableDeclaration', declarations)
        //
        //
        // if (node.type === 'VariableDeclaration' && node.declarations[0].id.name === 'a' && node.declarations[0].init.value === 1) {
        //     node.declarations[0].init.value = 2;
        // } else if (node.type === 'VariableDeclaration' && node.declarations[0].id.name === 'b' && node.declarations[0].init.value === 2) {
        //     node.declarations[0].init.value = 1;
        // }
    }
});

const newCode = babelGenerate(ast).code;
console.log(newCode);
