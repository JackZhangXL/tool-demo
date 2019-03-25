const glob = require("glob-promise");
const CLIEngine = require("eslint").CLIEngine;

const cli = new CLIEngine({
    useEslintrc: false,
    parserOptions: {
        ecmaVersion: 5
    }
});

const checkFiles = async() => {
    const errorMessages = [];
    let errorMsg = '';
    const files = await glob('src/tmp/*.js', { nodir: true });

    try {
        const results = cli.executeOnFiles(files).results;

        results.forEach(result => {
            console.log(result);
            if (result.errorCount > 0) {
                errorMsg += `${result.filePath}:\n`;
                errorMsg += result.messages.map(msg => {
                    const { message, line, column } = msg;
                    return `${message}, line: ${line}, column: ${column}\n`;
                }).join('\n');
            }
        });
    } catch (e) {
        errorMsg = `es-5-check error: ${e.message}`;
        console.error(errorMsg);
    }

    if (errorMsg !== '') {
        errorMessages.push(errorMsg);
    }

    if (errorMessages.length > 0) {
        console.error(`es-5-check failed: \n${errorMessages.join('\n')} \n`);
        process.exit(1);
    } else {
        console.info('es-5-check ok');
    }
};

checkFiles();
