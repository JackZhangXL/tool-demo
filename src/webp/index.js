const fse = require('fs-extra');
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

const srcDir = path.resolve(__dirname, '../tmp/images');
const distDir = path.resolve(__dirname, '../tmp/build/images');

// 先清空文件夹，每次手删好麻烦~
fse.emptyDir(distDir)
    .then(() => {
        console.log('empty success!');
    })
    .catch(err => {
        console.error(err);
    });

(async() => {
    await imagemin([`${srcDir}/*.{jpg,png}`], distDir, {
        plugins: [
            imageminMozjpeg({ quality: 70 }),
            imageminPngquant({ quality: [0.6, 0.8] })
        ]
    });

    await imagemin([`${distDir}/*.{jpg,png}`], distDir, {
        use: [
            imageminWebp({ quality: 50 })
            // imageminWebp({lossless: true})    // 无损压缩
        ]
    });
})();
