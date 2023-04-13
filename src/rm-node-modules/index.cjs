// const path = require('path');
// const execa = require('execa');
const fs = require('fs');
const glob = require('glob');
const inquirer = require('inquirer');
const process = require('child_process');

const rootPath = require('yargs').argv._[0];
console.log(rootPath);

// const g = new glob.Glob(`${rootPath}/*/node_modules`);                   // 全删
const g = new glob.Glob(`${rootPath}/!(tool-demo|ocDemo)/node_modules`);    // 如果要排除某些文件夹，可以这里指定

g.on('end', (dirs) => {
    if (!dirs.length) {
        console.log('子目录里没有 node_modules 文件夹');
        return;
    }

    console.log('这些目录下含有 node_modules，将被删除');
    console.log(dirs);
    const questions = [
        {
            type: 'confirm',
            name: 'isRemove',
            message: '确定要删除这些 node_modules 目录吗？',
            default: false
        }
    ];

    inquirer.prompt(questions).then(answers => {
        if (answers.isRemove) {
            dirs.forEach(dir => {
                if (fs.existsSync(dir)) {   // 双保险
                    process.exec(`rm -rf ${dir}`, err => {
                        err ? console.log(err) : console.log(`删除 ${dir} 成功！`);
                    });
                }
            });

        }
    });

});
g.on('error', (err) => {
    console.log(err);
});
g.on('abort', () => {
    console.log('abort');
});

// 执行：
// node src/rm-node-modules/index.cjs ~/codeDummy
// node src/rm-node-modules/index.cjs ~/codeSample
// node src/rm-node-modules/index.cjs ~/code/merchant