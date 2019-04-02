const generatorRegExp = /^(@zxl\/)?generator-(.+)$/;

console.log(generatorRegExp.test('@zxl/generator-project-name1'));              // true
console.log(generatorRegExp.test('@zxl/gen-project-name1'));                    // false
console.log(generatorRegExp.test('@jack/generator-project-name1'));             // false
console.log('@zxl/generator-project-name1'.replace(generatorRegExp, '$1$2'));   // @zxl/project-name1   正则里$1$2分别代表第1第2个括号


console.log(/e/.exec("The best things in life are free!"));