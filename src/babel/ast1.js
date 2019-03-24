const babel = require('@babel/core');
const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;
const babelTypes = require('@babel/types');
const babelGenerate = require('@babel/generator').default;

// 我们将 foo === bar  转成 sebmck === dork
const code = `foo === bar`;

// 方式一：直接写，@babel/traverse 里直接转换 ast
const ast = babelParser.parse(code);
babelTraverse(ast, {
    enter(path) {
        const node = path.node;
        if (node.operator !== "===") {
            return;
        }
        node.left = babelTypes.identifier('sebmck');
        node.right = babelTypes.identifier("dork");
    }
});
const newCode = babelGenerate(ast).code;
console.log(newCode);


// 方式二：用插件，@babel/core 的 transform 方式引入插件
const plugin1 = require('./plugin1');
const ast1 = babel.transform(code, {
    plugins: [plugin1],
});
console.log(ast1.code);
