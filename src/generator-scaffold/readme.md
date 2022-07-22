## 简介
Yeoman（官网 https://yeoman.io/learning/ ）是一个脚手架生成器。自定义的脚手架以generator-XYZ命名，发布后用yo XYZ就能执行。常用yo命令：
``` JavaScript
npm install -g yo
yo --version
yo --generators  // 列出安装过的generator
yo --help
```

## generator

### Step1：初始化文件夹
建一个名为**"generator-XYZ"**的文件夹，例如generator-scaffold。文件夹名必须generator-前缀，因为Yeoman依赖文件系统来查找可用的generator。文件夹内用 npm init 初始化项目，并 npm install --save yeoman-generator 安装，package.json 里有几个强约束：
``` javascript
{
  "name": "generator-scaffold",
  "version": "0.1.0",
  "description": "",
  "files": [                // files就是告诉Yeoman去哪里找generator
    "app"
  ],
  "keywords": ["yeoman-generator"],
  "dependencies": {
    "yeoman-generator": "^5.6.1"
  }
}
```
手动文件夹内配置如下目录结构
├───package.json
├───app/
│   └───index.js

### Step2：继承yeoman-generator
/app/index.js 里可以自定义generator。当然不用全部重写，通常是继承yeoman-generator，然后拓展想要的功能。
``` javascript
import Generator from 'yeoman-generator';
export default class extends Generator {
  ...
}
```

### Step3：constructor
终端可以传递参数，参数需要在constructor里通过this.argument()里定义，定义的参数会被保存到this.options里：
``` javascript
export default class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        // options支持：type，require，default，desc
        // 终端执行yo scaffold --babel --ts，显示 true true
        this.option('babel');
        this.log(this.options.babel);
        this.option('ts');
        this.log(this.options.ts);
    }
}
```
constructor里通常会做一些通用的工作。例如通过检查src目录是否存在，来判断是否已经初始化：
``` javascript
export default class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        ...
        if (fs.existsSync('src')) {     // 检查脚手架是否已经存在
            this.log(chalk.bold.green('src 目录已存在，资源已经初始化，退出...'));
            process.exit(1);
        }
        this.info = null;
        this.config.save();    // 生成 .yo-rc.json 文件。Yeoman通过这个文件知道该目录是根目录
    }
    ...
}

```
### Step4：running-loop
每个被添加到prototype中的方法都会被按顺序执行：
1. initializing - 初始化阶段，校验参数，获取配置文件等
2. prompting - 交互阶段，提示用户输入选项
3. configuring - 配置阶段，保存配置项（例如创建.editorconfig文件）
4. default - 所有其他名字的方法，都在此阶段执行
5. writing - 写入阶段，写入脚手架内的文件
6. conflicts - 解决冲突阶段
7. install - 安装阶段，执行npm install，yarn add等命令
8. end - 最终阶段，可以执行清理等动作

``` JavaScript
export default class extends Generator {
    constructor(args, opts) { ... }

    method1() {
        this.log('_method 1 just ran');
    }

    method2() {
        this.log('_method 2 just ran');
    }

    initializing() {
        this.log('initializing...');
    }

    prompting() {
        this.log('prompting...');
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
};
```
打印结果：
``` JavaScript
// initializing...
// prompting...
// configuring...
// _method 1 just ran
// _method 2 just ran
// default...
// writing...
// conflicts...
// install...
// end...
```

### Step5：调试发布
可以将这个仓库发布npm，然后安装这个包。但这样调试太麻烦，可以在开发目录下执行npm link，可以将本地包链接到全局环境下，就好像真的安装了包一样。
``` javascript
npm link
yo scaffold   // 执行调试
```
