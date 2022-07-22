const execa = require('execa');
const Listr = require('listr');
const { Observable } = require('rxjs');
const fs = require('fs');
const split = require('split');

// 基本用法1，task属性返回同步对象，或 Promise
// const tasks = new Listr([
//     {
//         title: 'Success',
//         task: () => 'Foo'
//         // task: () => Promise.resolve('Foo')   // 这样写效果一样
//     },
//     {
//         title: 'Failure',
//         task: () => {
//             throw new Error('Bar')
//         }
//         // task: () => Promise.reject(new Error('Bar'))     // 这样写效果一样
//     }
// ]);
//
// tasks.run().catch(err => {
//     console.error(err);
// });


// 基本用法2，task属性返回 Observable 对象
// const tasks = new Listr([
//     {
//         title: 'Success',
//         task: () => {
//             return new Observable(observer => {
//                 observer.next('Foo');
//
//                 setTimeout(() => {
//                     observer.next('Bar');
//                 }, 2000);
//
//                 setTimeout(() => {
//                     observer.complete();
//                 }, 4000);
//             });
//         }
//     },
//     {
//         title: 'Failure',
//         task: () => Promise.reject(new Error('Bar'))
//     }
// ]);
//
// tasks.run().catch(err => {
//     console.error(err);
// });


// 基本用法3，task属性返回 ReadableStream 对象
// const tasks = new Listr([
//     {
//         title: 'File',
//         task: () => fs.createReadStream('./data.txt', 'utf8')
//             .pipe(split(/\r?\n/, null, {trailing: false}))
//     }
// ]);
//
// tasks.run().catch(err => {
//     console.error(err);
// });


// 基本用法4，可选的 skip 属性
// const tasks = new Listr([
//     {
//         title: 'Task 1',
//         task: () => Promise.resolve('Foo')
//     },
//     {
//         title: 'Can be skipped',
//         skip: () => {
//             if (Math.random() > 0.5) {
//                 return 'Reason for skipping';
//             }
//         },
//         task: () => 'Bar'
//     },
//     {
//         title: 'Task 3',
//         task: () => Promise.resolve('Bar')
//     }
// ]);
//
// tasks.run().catch(err => {
//     console.error(err);
// });


// 基本用法5，可选的 enabled 属性
// const tasks = new Listr([
//     {
//         title: 'Install package dependencies with Yarn',
//         task: (ctx, task) => execa('yarn')
//             .catch(() => {
//                 ctx.yarn = false;               // 执行失败的话，在 context 里保存一下
//                 task.skip('Yarn not available, install it via `npm install -g yarn`');
//             })
//     },
//     {
//         title: 'Install package dependencies with npm',
//         enabled: ctx => ctx.yarn === false,     // 如果 yarn 失败，再执行 npm
//         task: () => execa('npm', ['install'])
//     }
// ]);


// 基本用法6，context
// const tasks = new Listr([
//     {
//         title: 'Task 1',
//         skip: ctx => ctx.foo === 'bar',         // 判断 context 参数
//         task: () => Promise.resolve('Foo')
//     },
//     {
//         title: 'Can be skipped',
//         skip: () => {
//             if (Math.random() > 0.5) {
//                 return 'Reason for skipping';
//             }
//         },
//         task: ctx => {
//             ctx.unicorn = 'rainbow';            // 设置 context 参数
//         }
//     },
//     {
//         title: 'Task 3',
//         task: ctx => Promise.resolve(`${ctx.foo} ${ctx.bar}`)
//     }
// ]);
//
// tasks.run({ foo: 'bar' }).then(ctx => {         // run 方法中传递 context 参数
//     console.log(ctx);
//     //=> {foo: 'bar', unicorn: 'rainbow'}
// });


// 基本用法7，参数task
// const tasks = new Listr([
//     {
//         title: 'Install package dependencies with Yarn',
//         task: (ctx, task) => execa('yarn')
//             .catch(() => {
//                 ctx.yarn = false;
//                 task.title = `${task.title} (or not)`;
//                 task.skip('Yarn not available');
//             })
//     },
//     {
//         title: 'Install package dependencies with npm',
//         skip: ctx => ctx.yarn !== false && 'Dependencies already installed with Yarn',
//         task: (ctx, task) => {
//             task.output = 'Installing dependencies...';
//             return execa('npm', ['install'])
//         }
//     }
// ]);
//
// tasks.run();


// 综合例子
const tasks = new Listr([
    {
        title: 'Git',
        task: () => {
            return new Listr([
                {
                    title: 'Checking git status',
                    task: () => execa.stdout('git', ['status', '--porcelain']).then(result => {
                        if (result !== '') {
                            throw new Error('Unclean working tree. Commit or stash changes first.');
                        }
                    })
                    // task: () => execa('ls', ['-al']).then(result => {
                    //     console.log(result.stdout);
                    // })
                },
                {
                    title: 'Checking remote history',
                    task: () => execa.stdout('git', ['rev-list', '--count', '--left-only', '@{u}...HEAD']).then(result => {
                        if (result !== '0') {
                            throw new Error('Remote history differ. Please pull changes.');
                        }
                    })
                }
            ], {concurrent: true});
        }
    },
    {
        title: 'Install package dependencies with Yarn',
        task: (ctx, task) => execa('yarn')
            .catch(() => {
                ctx.yarn = false;
                task.skip('Yarn not available, install it via `npm install -g yarn`');
            })
    },
    {
        title: 'Install package dependencies with npm',
        enabled: ctx => ctx.yarn === false,
        task: () => execa('npm', ['install'])
    },
    {
        title: 'Run tests',
        task: () => execa('npm', ['test'])
    },
    {
        title: 'release package',
        task: () => execa('npm', ['run', 'release'])
    }
]);

tasks.run().catch(err => {
    console.error(err);
});