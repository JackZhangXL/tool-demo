const Config = require('webpack-chain');

const config = new Config();

config
    .entry('index')
    .add('src/index.js')
    .end()
    .output
    .path('dist')
    .filename('[name].bundle.js');

config.module
    .rule('lint')
    .test(/\.js$/)
    .pre()
    .include
    .add('src')
    .end()
    .use('eslint')
    .loader('eslint-loader')
    .options({
        rules: {
            semi: 'off'
        }
    });

config.module
    .rule('compile')
    .test(/\.js$/)
    .include
    .add('src')
    .add('test')
    .end()
    .use('babel')
    .loader('babel-loader')
    .options({
        presets: [
            ['@babel/preset-env', { modules: false }]
        ]
    });

// config
//     .plugin('clean')
//     .use(CleanPlugin, [['dist'], { root: '/dir' }]);

console.log(config.toConfig());
// { output: { path: 'dist', filename: '[name].bundle.js' },
//     module: { rules: [ [Object], [Object] ] },
//     entry: { index: [ 'src/index.js' ] } }
module.exports = config.toConfig();