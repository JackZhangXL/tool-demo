// 我们将 require.context('../mock-server/api', true, /\.js(on)?$/);
// 装换成 (function () {});

module.exports = (babel) => {
    const t = babel.types;
    return {            // 插件返回的对象，需要有 visitor 属性
        visitor: {      // visitor 中的每个方法，都有 path，options 这两个参数
            CallExpression(path, options) {
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
                        t.functionExpression(null, [], t.blockStatement([])),
                    );
                }
            }
        }
    };
};