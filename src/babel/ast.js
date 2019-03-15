const babel = require('babel-core');

// 我们将 var a = 1;  var b = 2;
// 装换成 var a = 2;  var b = 1;
const code = ` var a = 1; var b = 2 `;
const ast = babel.transform(code, {
    plugins: [
        [
            require('./babel-custom-code-filter'),
            {
                debug: true,
            },
        ],
    ],
});

console.log(ast.code);


// 我们将 require.context('../mock-server/api', true, /\.js(on)?$/);
// 装换成 (function () {});
const code2 = ` require.context('../mock-server/api', true, /\\.js(on)?$/); `;
const ast2 = babel.transform(code2, {
    plugins: [
        [
            require('./babel-custom-code-transform'),
            {
                debug: true,
            },
        ],
    ],
});

console.log(ast2.code);
