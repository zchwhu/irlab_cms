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

require(['jquery','jquery.modal','script/util/sidebar.js','script/util/reset.js','script/util/alert.js','script/util/validate.js'],function ($,modal,sidebar,reset,alert,validate) {
    var irSidebar = sidebar('.ir-sidebar',['.ir-main','.ir-header','.ir-footer'],'.icon-menu');
    irSidebar.init(240);

    $(document).on("click",".paper-add-btn",function () {
        $(".paper-add-modal").modal();
    })

    $(document).on("click",".paper-edit-btn",function () {
        $(".paper-edit-modal").modal();
    })

    $(document).on("click",".paper-del-btn",function () {
        var that = $(this);
        var myAlert = alert({
            message: '你确定要删除这篇论文条目吗？',
            type: 'confirm',
            success: function () {
                that.parents(".ir-pub-item").remove();
            }
        });
        myAlert.init();
    })


    $('.paper-add-modal').on('hidden.bs.modal', function (e) {
        reset('.paper-add-form');
    })

    $('.paper-edit-modal').on('hidden.bs.modal', function (e) {
        reset('.paper-edit-form');
    })

    var validators = {
        title:{
            validators:{
                notEmpty:{
                    message:"请输入论文引文"
                }
            }
        },
        year:{
            validators:{
                notEmpty:{
                    message:"请输入论文出版时间"
                }
            }
        },
        link: {
            validators:{
                notEmpty:{
                    message:"请输入论文全文地址"
                },
                isURL: {
                    message:"链接格式错误，请重新输入"
                }
            }
        },
        fullText: {
            validators: {
                notEmpty: {
                    message: "请上传论文全文"
                }
            }
        },
        author: {
            validators: {
                notEmpty: {
                    message: "请选择论文作者"
                }
            }
        }
    };

    $('#paperEditBtn').click(function () {
        var $isValid = validate($(".paper-edit-form"),validators);
        return $isValid;
    })

    $('#paperAddBtn').click(function () {
        console.log("click");
        var $isValid = validate($(".paper-add-form"),validators);
        return $isValid;
    })

    // 消除输入框错误提示信息
    $("input[type='text'],input[type='password']").focus(function () {
        if($(this).parents(".form-group").next(".help-block").length>0){
            $(this).parents(".form-group").next(".help-block").remove();
        }
    })

    //消除上传图片部分错误提示信息
    $("input[type='file']").change(function () {
        if($(this).val().length>0){
            if($(this).parents(".form-group").next(".help-block").length>0){
                $(this).parents(".form-group").next(".help-block").remove();
            }
        }
    })


    $("input[type='checkbox']").change(function () {
        if($(this).is(":checked")){
            if($(this).parents(".form-group").next(".help-block").length>0){
                $(this).parents(".form-group").next(".help-block").remove();
            }
        }
    })
})