// 我们将 var a = 1;  var b = 2;
// 装换成 var a = 2;  var b = 1;

module.exports = function(babel) {
    return {                // 必须返回一个包含 visitor 属性的对象
        visitor: {
            VariableDeclarator: function(path, settings) {
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
