const babel = require('@babel/core');
const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;
const babelTypes = require('@babel/types');
const babelGenerate = require('@babel/generator').default;

// 我们将 var a = 1;  var b = 2; 转成 var a = 2;  var b = 1;
const code = `var a = 1; var b = 2`;

// 方式一：直接写，@babel/traverse 里直接转换 ast
const ast = babelParser.parse(code);
babelTraverse(ast, {
    enter(path) {
        const node = path.node;

        // 直观粗暴的方式：
        // if (node.type === 'VariableDeclaration' && node.declarations[0].id.name === 'a' && node.declarations[0].init.value === 1) {
        //     node.declarations[0].init.value = 2;
        // } else if (node.type === 'VariableDeclaration' && node.declarations[0].id.name === 'b' && node.declarations[0].init.value === 2) {
        //     node.declarations[0].init.value = 1;
        // }

        // // 上面这种方式太low，可以用 @babel/types 提供的工具方法
        if (babelTypes.isIdentifier(node, { name: 'a' })) {
            if (babelTypes.isNumericLiteral(path.parent.init, { value: 1 })) {
                path.parent.init = babelTypes.numericLiteral(2);
            }
        } else if (babelTypes.isIdentifier(node, { name: 'b' })) {
            if (babelTypes.isNumericLiteral(path.parent.init, { value: 2 })) {
                path.parent.init = babelTypes.numericLiteral(1);
            }
        }
    }
});
const newCode = babelGenerate(ast).code;
console.log(newCode);


// 方式二：用插件，@babel/core 的 transform 方式引入插件
const plugin2 = require('./plugin2');
const ast1 = babel.transform(code, {
    plugins: [plugin2],
});
console.log(ast1.code);
