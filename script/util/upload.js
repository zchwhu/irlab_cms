/**
 * Created by Administrator on 2017/3/29 0029.
 */
requirejs.config({
    paths:{
        'jquery':'lib/jquery-1.7.1.min'
    }
});

define(['jquery'],function ($) {
    function upload(target,event) {
        var files = event.target.files,
            reader = new FileReader(),
            target = $(target),
            progress = $(progress);

        if(/image/.test(files[0].type)){
            reader.readAsDataURL(files[0]);
        }

        reader.onload = function () {
            target.attr("src",reader.result);
        }
    }

    return upload;
})