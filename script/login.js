/**
 * Created by Administrator on 2017/3/30 0030.
 */
requirejs.config({
    paths:{
        'jquery':'lib/jquery-1.7.1.min',
        'jquery.validate': 'lib/jquery.validate'
    }
});

define(['jquery','script/util/validate.js'],function ($,validate) {
    $("#loginBtn").click(function () {
        var $isValid = validate($(".ir-login-form"),{
            username:{
                parent: ".ir-login-form-control",
                validators:{
                    notEmpty:{
                        message:"用户名不能为空,请输入用户名"
                    }
                }
            },
            password:{
                parent: ".ir-login-form-control",
                validators:{
                    notEmpty:{
                        message:"密码不能为空,请输入登录密码"
                    }
                }
            },
            // 校验验证码
            verification:{
                parent: ".ir-login-form-group",
                validators:{
                    notEmpty:{
                        message:"验证码不能为空,请输入验证码"
                    }
                }
            }
        })
        return $isValid;
    })

    $("input[type='text'],input[type='password']").focus(function () {
        if($(this).parents(".ir-login-form-control").next(".help-block").length>0){
            $(this).parents(".ir-login-form-control").next(".help-block").remove();
        }
    })
})