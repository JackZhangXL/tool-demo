// 方式一
function checkWebp(callback) {
    var img = new Image();
    img.onload = function () {
        //通过图片宽度值判断图片是否可以显示
        var result = (img.width > 0) && (img.height > 0);
        callback(result);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
}

function showImage(useWebp){
    var imgs = Array.from(document.querySelectorAll('img'));

    imgs.forEach(function(i){
        var src = i.attributes['data-src'].value;
        if (useWebp){
            src = src.replace(/\.jpg$/, '.webp');
        }
        i.src = src;
    });
}

checkWebp(showImage);


// 方式二
// function checkWebp() {
//     try{
//         return(document.createElement_x('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
//     }catch(err) {
//         return false;
//     }
// }
// console.log(checkWebp()); // true or false