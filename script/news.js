/**
 * Created by Administrator on 2017/3/28 0028.
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


    // 数据获取和渲染
    var newsItemTemplate = Handlebars.compile($("#newsItemTemp").html());
    $.ajax({
        url:"data/data.json",
        success:
            function (data) {
                $('#newsList').html(newsItemTemplate(data));
            }
        })


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