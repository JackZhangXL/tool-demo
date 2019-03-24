const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;
const babelTypes = require('@babel/types');
const babelGenerate = require('@babel/generator').default;

/* 例子1，2 */
const MyVisitor = {
    Identifier() {
        console.log("Called!");
    }
};
const MyVisitor2 = {
    Identifier: {
        enter() {
            console.log("Entered!");
        },
        exit() {
            console.log("Exited!");
        }
    }
};
const code = `function square(n) {
  return n * n;
}`;
const ast = babelParser.parse(code);
babelTraverse(ast, {
    enter(path) {
        // console.log("path：", path);
        path.traverse(MyVisitor);
    }
});
// Called!
// Called!
// Called!
// Called!
// Called!
// Called!
// Called!
// Called!
// Called!
// Called!
// Called!
// Called!
// Called!
// Called!

/* 例子3：将 n * n 改成 x * x */
let paramName;
const MyVisitor3 = {
    FunctionDeclaration(path) {
        const param = path.node.params[0];
        paramName = param.name;
        param.name = "x";
    },

    Identifier(path) {
        if (path.node.name === paramName) {
            path.node.name = "x";
        }
    }
};
const ast3 = babelParser.parse(code);
babelTraverse(ast3, {
    enter(path) {
        path.traverse(MyVisitor3);
    }
});
const newCode3 = babelGenerate(ast3).code;
console.log(newCode3);
// function square(x) {
//     return x * x;
// }

// 上面这样不够优雅，改成下面这样
const updateParamNameVisitor = {
    Identifier(path) {
        if (path.node.name === this.paramName) {
            path.node.name = "x";
        }
    }
};

const MyVisitor4 = {
    FunctionDeclaration(path) {
        const param = path.node.params[0];
        const paramName = param.name;
        param.name = "x";
        path.traverse(updateParamNameVisitor, { paramName });
    }
};
const ast4 = babelParser.parse(code);
babelTraverse(ast4, {
    enter(path) {
        path.traverse(MyVisitor4);
    }
});
const newCode4 = babelGenerate(ast4).code;
console.log(newCode4);
