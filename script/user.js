/**
 * Created by Administrator on 2017/3/28 0028.
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

require(['jquery','jquery.modal','script/util/sidebar.js'],function ($,modal,sidebar) {
    var SIDEBAR_WIDTH = 240;
    var irSidebar = sidebar('.ir-sidebar',['.ir-main','.ir-header','.ir-footer'],'.icon-menu');
    irSidebar.init(SIDEBAR_WIDTH);

    $()
})