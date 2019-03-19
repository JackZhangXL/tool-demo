const glob = require("glob-promise");
const fse = require("fs-extra");
const path = require("path");
const CLIEngine = require("eslint").CLIEngine;

const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse');
const babelTypes = require('@babel/types');
const babelGenerate = require('@babel/generator');

const logTag = 'es5-check';

const removeComments = (code) => {
    const ast = babelParser.parse(code);

    babelTraverse.default(ast, {
        enter(path) {
            babelTypes.removeComments(path.node);
        },
    });

    return babelGenerate.default(ast).code;
};

const cli = new CLIEngine({
    useEslintrc: false,
    configFile: path.join(__dirname, 'es5-check.json')
    // rules: {
    //     parserOptions: {
    //         ecmaVersion: 5
    //     }
    // }
});
// console.log(cli.getRules())
const readFiles = async() => {
    const files = await glob('src/eslint/tmp/*.js', { nodir: true });

    const fileContentJobs = files.map(file => {
        return fse.readFile(file, { encoding: 'utf-8' });
    });
    const fileContents = await Promise.all(fileContentJobs);
    console.log(fileContents);

    const errorMessages = [];
    fileContents.forEach((fileContent, index) => {
        const filePath = files[index];
        console.log(filePath);
        let errorMsg;
        const transformedContent = removeComments(fileContent);
        console.log(transformedContent);

        try {
            const result = cli.executeOnText(transformedContent, filePath).results[0];
            console.log(result);

            if (result.errorCount > 0) {
                errorMsg = `${filePath}:\n`;
                errorMsg += result.messages.map((message) => {
                    const {
                        message: msg,
                        line,
                        column,
                    } = message;

                    return `${msg}, line: ${line}, column: ${column}`;
                }).join('\n');
            }
        } catch (e) {
            // errorMsg = error(`${filePath}:\n error: ${e.message}`, logTag);
        }

        if (errorMsg) {
            errorMessages.push(errorMsg);
        }
    });

    if (errorMessages.length > 0) {
        // error(`failed: \n ${errorMessages.join('\n')} \n`, logTag);
        process.exit(1);
    } else {
        info('ok', logTag);
    }
};

readFiles();


