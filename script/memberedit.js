/**
 * Created by Administrator on 2017/3/29 0029.
 */
requirejs.config({
    shim: {
        'jquery.modal': ['jquery'],
        'wangEditor.min': ['jquery']
    },
    paths:{
        'jquery':'lib/jquery-1.7.1.min',
        'jquery.modal': 'lib/jquery.modal',
        'wangEditor': 'lib/wangEditor.min'
    }
});

require(['jquery','script/util/sidebar.js','script/util/upload.js','wangEditor'],function ($,sidebar,upload) {
    $(function () {
        var irSidebar = sidebar('.ir-sidebar',['.ir-main','.ir-header','.ir-footer'],'.icon-menu');
        irSidebar.init(240);

        $(document).on("change","input[type='file']",function (e) {
            upload(".form-avatar",e);
        })

        var editor = new wangEditor('editor');
        editor.config.menus = [
            'source',
            'bold',
            'underline',
            'italic',
            'strikethrough',
            'eraser',
            'forecolor',
            'bgcolor',
            'quote',
            'fontfamily',
            'fontsize',
            'head',
            'unorderlist',
            'orderlist',
            'alignleft',
            'aligncenter',
            'alignright',
            'link',
            'unlink',
            'table',
            'img',
            'undo',
            'redo',
            'fullscreen'
        ];
        editor.create();
    })
})