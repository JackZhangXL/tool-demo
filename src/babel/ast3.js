const babel = require('@babel/core');
const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;
const babelTypes = require('@babel/types');
const babelGenerate = require('@babel/generator').default;

// 我们将 require.context('../mock-server/api', true, /\.js(on)?$/); 转成 (function () {});
const code = `require.context('../mock-server/api', true, /\\.js(on)?$/);`;

// 方式一：直接写，@babel/traverse 里直接转换 ast
const ast = babelParser.parse(code);
babelTraverse(ast, {
    enter(path) {
        const node = path.node;
        const arguments = node.arguments;
        const callee = node.callee;
        if (arguments &&
            arguments.length === 3 && callee &&
            callee.object &&
            callee.object.name === 'require' &&
            callee.property &&
            callee.property.name === 'context' &&
            arguments[0].value === '../mock-server/api' &&
            arguments[1].value === true &&
            arguments[2].pattern === '\\.js(on)?$') {
            path.replaceWith(
                babelTypes.functionExpression(null, [], babelTypes.blockStatement([])),
            );
        }
    }
});
const newCode = babelGenerate(ast).code;
console.log(newCode);


// 方式二：用插件，@babel/core 的 transform 方式引入插件
const plugin3 = require('./plugin3');
const ast1 = babel.transform(code, {
    plugins: [plugin3],
});
console.log(ast1.code);

