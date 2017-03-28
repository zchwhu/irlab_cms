/**
 * Created by Administrator on 2017/3/28 0028.
 */
requirejs.config({
    paths:{
        'jquery':'lib/jquery-1.7.1.min'
    }
});

define(['jquery'],function ($) {
    function Sidebar(container,ref,btn) {
        this.container = $(container);
        this.ref = ref;
        this.btn = $(btn);
    }
    Sidebar.prototype.init = function (num) {
        var container = this.container;
        var ref = this.ref;
        var btn = this.btn;
        var isCollapsed = false;

        btn.click(function () {
            if(!isCollapsed){
                isCollapsed = true;
                $(document.body).addClass("collapsed");
            }else{
                isCollapsed = false;
                $(document.body).removeClass("collapsed");
            }
        })
    }

    return function (container,ref,btn) {
        return new Sidebar(container,ref,btn);
    }
})