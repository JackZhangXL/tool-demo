// 我们将 var a = 1;  var b = 2;
// 装换成 var a = 2;  var b = 1;

module.exports = (babel) => {
    return {            // 插件返回的对象，需要有 visitor 属性
        visitor: {      // visitor 中的每个方法，都有 path，options 这两个参数
            VariableDeclarator(path, options) {
                const node = path.node;
                if (node.id.name === 'a' && node.init.value === 1) {
                    node.init.value = 2;
                } else if (node.id.name === 'b' && node.init.value === 2) {
                    node.init.value = 1;
                }
            }
        }
    };
};
