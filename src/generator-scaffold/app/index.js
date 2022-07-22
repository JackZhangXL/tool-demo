import Generator from 'yeoman-generator';
import fs from 'fs';
import chalk from 'chalk';

export default class extends Generator { 
    constructor(args, opts) {
        super(args, opts);

        // options支持：type，require，default，desc
        // 终端执行yo scaffold --babel --ts，显示 true true
        this.option('babel');
        this.log(this.options.babel);
        this.option('ts');
        this.log(this.options.ts);
        
        // 检查脚手架是否已经存在
        if (fs.existsSync('src')) { 
            this.log(chalk.bold.green('src 目录已存在，资源已经初始化，退出。'));
            process.exit(1);
        }
        this._yarnExist = null;
        this._tplOptions = {};
        this.config.save(); // 生成 .yo-rc.json 文件。Yeoman通过这个文件知道该目录是根目录
    }
    
    method2() {
        this.log('_method 2 just ran');
    }

    initializing() {
        const {
            options: {
                appname,
                version = '0.0.0',
                description = '',
                author = '',
                repo = `https://github.com/yourname/${appname}.git`,
            },
        } = this;

        this._tplOptions = {
            appname,
            version,
            description,
            author,
            repo,
        };
    }

    async prompting() {
        await this.prompt([{
            type: 'list',
            name: 'groupType',
            message: '请选择一个选项',
            choices: [{
                name: '选项一',
                value: 1,
            }, {
                name: '选项二',
                value: 2,
            }, {
                name: '选项三',
                value: 3,
            }],
        }]);
    }

    configuring() {
        this.log('configuring...');
    }

    default() {
        this.log('default...');
    }

    writing() {
        this.log('writing...');
    }

    conflicts() {
        this.log('conflicts...');
    }

    install() {
        this.log('install...');
    }

    end() {
        this.log('end...');
    }
}