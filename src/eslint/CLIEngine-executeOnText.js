const glob = require("glob-promise");
const fse = require("fs-extra");
const CLIEngine = require("eslint").CLIEngine;

const cli = new CLIEngine({
    useEslintrc: false,
    parserOptions: {
        ecmaVersion: 5
    }
});

const checkFiles = async() => {
    const files = await glob('src/tmp/*.js', { nodir: true });

    const fileContentJobs = files.map(file => {
        return fse.readFile(file, { encoding: 'utf-8' });
    });
    const fileContents = await Promise.all(fileContentJobs);
    // console.log(fileContents);

    const errorMessages = [];
    fileContents.forEach((fileContent, index) => {
        const filePath = files[index];
        let errorMsg;

        try {
            const result = cli.executeOnText(fileContent, filePath).results[0];
            // console.log(result);

            if (result.errorCount > 0) {
                errorMsg = `${filePath}:\n`;
                errorMsg += result.messages.map(item => {
                    const { message, line, column } = item;
                    return `${message}, line: ${line}, column: ${column}`;
                }).join('\n');
            }
        } catch (e) {
            errorMsg = `es-5-check error: ${filePath}:\n ${e.message}`;
            console.error(errorMsg)
        }

        if (errorMsg) {
            errorMessages.push(errorMsg);
        }
    });

    if (errorMessages.length > 0) {
        console.error(`es-5-check failed: \n${errorMessages.join('\n')} \n`);
        process.exit(1);
    } else {
        console.info('es-5-check ok');
    }
};

checkFiles();
