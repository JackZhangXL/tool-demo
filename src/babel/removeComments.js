const path = require("path");
const glob = require("glob-promise");
const fse = require("fs-extra");

const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;
const babelTypes = require('@babel/types');
const babelGenerate = require('@babel/generator').default;

const removeComments = (code) => {
    const ast = babelParser.parse(code);

    babelTraverse(ast, {
        enter(path) {
            babelTypes.removeComments(path.node);
        },
    });

    return babelGenerate(ast).code;
};

const run = async() => {
    const files = await glob('src/tmp/*.js', { nodir: true });

    const fileContentJobs = files.map(file => {
        return fse.readFile(file, { encoding: 'utf-8' });
    });
    const fileContents = await Promise.all(fileContentJobs);

    fileContents.forEach((fileContent, index) => {
        const transformedContent = removeComments(fileContent);

        const temp = files[index].split('/');
        const fileName = temp[temp.length-1];
        const filePath = path.join(__dirname, `../tmp/nocomment/${fileName}`);

        fse.writeFile(filePath, transformedContent, (err) => {
            if (err) {
                return console.error(err);
            }
        });
    });
};

run();
