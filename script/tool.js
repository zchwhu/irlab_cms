/**
 * Created by Administrator on 2017/3/30 0030.
 */
requirejs.config({
    shim: {
        'handlebars': ['jquery']
    },
    paths:{
        'jquery':'lib/jquery-1.7.1.min',
        'handlebars':'lib/handlebars'
    }
});

require(['jquery','script/util/sidebar.js','script/util/alert.js','handlebars'],function ($,sidebar,alert,Handlebars) {
    var irSidebar = sidebar('.ir-sidebar',['.ir-main','.ir-header','.ir-footer'],'.icon-menu');
    irSidebar.init(240);

    var toolItemTemplate = Handlebars.compile($("#toolItemTemp").html());
    $.ajax({
        url:"data/data.json",
        success:
            function (data) {
                $('#toolList').html(toolItemTemplate(data));
            }
    })

    $(document).on("click",".item-del-btn",function () {
        var that = $(this);
        var $target = $(this).parents(".ir-panel");
        console.log($target.find(".ir-item-name").text());
        var myAlert = alert({
            message: '你确定要删除这篇这个工具吗？',
            type: 'confirm',
            success: function () {
                $target.remove();
            }
        });
        myAlert.init();
    })
})