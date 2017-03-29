/**
 * Created by Administrator on 2017/3/29 0029.
 */
requirejs.config({
    shim: {
        'jquery.modal': ['jquery']
    },
    paths:{
        'jquery':'lib/jquery-1.7.1.min',
        'jquery.modal': 'lib/jquery.modal'
    }
});

require(['jquery','jquery.modal','script/util/sidebar.js','script/util/reset.js'],function ($,modal,sidebar,reset) {
    var irSidebar = sidebar('.ir-sidebar',['.ir-main','.ir-header','.ir-footer'],'.icon-menu');
    irSidebar.init(240);

    $(document).on("click",".paper-add-btn",function () {
        $(".paper-add-modal").modal();
    })

    $(document).on("click",".paper-edit-btn",function () {
        $(".paper-edit-modal").modal();
    })

    $('.user-add-modal').on('hidden.bs.modal', function (e) {
        $(this).find(":input").val('');
    })

    $('.paper-edit-modal').on('hidden.bs.modal', function (e) {
        reset('.paper-edit-form');
    })

})