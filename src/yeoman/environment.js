const yeoman = require('yeoman-environment');
const env = yeoman.createEnv();

env.lookup(function () {
    console.log(env.getGeneratorsMeta());
    // env.run('test my-app --ts');
});

