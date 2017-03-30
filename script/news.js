/**
 * Created by Administrator on 2017/3/28 0028.
 */
requirejs.config({
    paths:{
        'jquery':'lib/jquery-1.7.1.min'
    }
});

require(['jquery','script/util/sidebar.js','script/util/alert.js'],function ($,sidebar,alert) {
    var irSidebar = sidebar('.ir-sidebar',['.ir-main','.ir-header','.ir-footer'],'.icon-menu');
    irSidebar.init(240);

    $(document).on("click",".news-del-btn",function () {
        var that = $(this);
        var $target = $(this).parents(".ir-panel");
        var myAlert = alert({
            message: '你确定要删除这篇这篇新闻吗？',
            type: 'confirm',
            success: function () {
                $target.remove();
            }
        });
        myAlert.init();
    })
})