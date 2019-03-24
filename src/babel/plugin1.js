// foo === bar;  在 ast 中：
// {
//     type: "BinaryExpression",
//     operator: "===",
//     left: {
//         type: "Identifier",
//         name: "foo"
//     },
//     right: {
//         type: "Identifier",
//         name: "bar"
//     }
// }
// 将它们变成 sebmck === dork;

module.exports = (babel) => {
    const t = babel.types;
    return {            // 插件返回的对象，需要有 visitor 属性
        visitor: {      // visitor 中的每个方法，都有 path，options 这两个参数
            BinaryExpression(path, options) {
                if (path.node.operator !== "===") {
                    return;
                }
                path.node.left = t.identifier('sebmck');
                path.node.right = t.identifier("dork");
            }
        }
    };
}


