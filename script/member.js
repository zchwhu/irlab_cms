/**
 * Created by Administrator on 2017/3/31.
 */
requirejs.config({
    paths:{
        'jquery':'lib/jquery-1.7.1.min'
    }
});

require(['jquery','script/util/sidebar.js','script/util/alert.js'],function ($,sidebar,alert) {
    $(".ir-menu-item").eq(1).addClass('active');

    var irSidebar = sidebar('.ir-sidebar',['.ir-main','.ir-header','.ir-footer'],'.icon-menu');
    irSidebar.init(240);

    $(document).on("click",".member-del-btn",function () {
        var that = $(this);
        var $target = $(this).parents(".ir-panel");
        var myAlert = alert({
            message: '你确定要删除该成员吗？',
            type: 'confirm',
            success: function () {
                $target.remove();
            }
        });
        myAlert.init();
    })
})