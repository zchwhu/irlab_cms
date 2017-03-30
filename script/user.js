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

require(['jquery','jquery.modal','script/util/sidebar.js','script/util/alert.js','script/util/reset.js','script/util/validate.js'],function ($,modal,sidebar,alert,reset,validate) {
    var SIDEBAR_WIDTH = 240;
    var irSidebar = sidebar('.ir-sidebar',['.ir-main','.ir-header','.ir-footer'],'.icon-menu');
    irSidebar.init(SIDEBAR_WIDTH);

    $(document).on('click','.user-cog-btn',function () {
        var $username = $(this).parent('td').siblings('.user-name').text();
        $(".user-cog-modal input[name='username']").val($username);
        $(".user-cog-modal").modal();
    })

    $(document).on("click",'.user-bind-btn',function () {
        $(".user-bind-modal").modal();
    })

    $(document).on("click",'.user-add-btn',function () {
        $(".user-add-modal").modal();
    })

    $(document).on("click",".user-bind-item",function () {
        if(!$(this).hasClass('disabled')){
            $(this).addClass("active").siblings().removeClass("active");
            var $selected = $(this).find("span").text();
        }
        $(".user-bind-tip span").text($selected);
    })

    $('.user-cog-modal').on('hidden.bs.modal', function (e) {
        reset('.user-cog-form');
    })

    $('.user-add-modal').on('hidden.bs.modal', function (e) {
        reset('.user-add-form');
    })


    $('.user-bind-modal').on('hidden.bs.modal', function (e) {
        $(this).find(".active").removeClass('active');
        $(this).find(".user-bind-tip").find('span').text('');
        reset('.user-bind-form');
    })

    $(document).on("click",".user-del-btn",function () {
        var that = $(this);
        var $target = $(this).parents("tr");
        var myAlert = alert({
            message: '你确定要删除该用户吗？',
            type: 'confirm',
            success: function () {
                $target.remove();
            }
        });
        myAlert.init();
    })

    $(".user-bind-confirm").click(function () {
        var $isValid = validate($(".user-bind-form"),{
            bind:{
                validators:{
                    notEmpty:{
                        message:"请选择绑定的成员"
                    }
                }
            }
        })
        return $isValid;
    })

    $(".user-add-confirm").click(function () {
        var $isValid = validate($(".user-add-form"),{
            username:{
                validators:{
                    notEmpty:{
                        message:"请输入新的用户名"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "请输入新的密码"
                    }
                }
            }
        })
        return $isValid;
    })

    $(".user-cog-confirm").click(function () {
        var $isValid = validate($(".user-cog-form"),{
            password:{
                validators:{
                    notEmpty:{
                        message:"请输入新密码"
                    }
                }
            },
            repeatpassword: {
                validators: {
                    notEmpty: {
                        message: "请确认密码"
                    },
                    isEqual:{
                        target: 'password',
                        message: "两次输入的密码不一致，请重新输入"
                    }
                }
            }
        })
        return $isValid;
    })

    // 消除输入框错误提示信息
    $("input[type='text'],input[type='password']").focus(function () {
        if($(this).parents(".form-group").next(".help-block").length>0){
            $(this).parents(".form-group").next(".help-block").remove();
        }
    })


    $("input[type='radio']").change(function () {
        if($(this).is(":checked")){
            if($(this).parents(".form-group").next(".help-block").length>0){
                $(this).parents(".form-group").next(".help-block").remove();
            }
        }
    })
})