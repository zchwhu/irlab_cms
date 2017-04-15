/**
 * Created by Administrator on 2017/3/29 0029.
 */
requirejs.config({
    shim: {
        'jquery.modal': ['jquery'],
        'wangEditor.min': ['jquery']
    },
    paths:{
        'jquery':'lib/jquery-1.7.1.min',
        'jquery.modal': 'lib/jquery.modal',
        'bootstrap-datetimepicker':'lib/bootstrap-datetimepicker',
        'wangEditor': 'lib/wangEditor.min'
    }
});

require(['jquery','script/util/sidebar.js','script/util/upload.js','script/util/validate.js','wangEditor','bootstrap-datetimepicker'],function ($,sidebar,upload,validate,editor,picker) {
    $(function () {
        $(".ir-menu-item").eq(4).addClass('active');

        var irSidebar = sidebar('.ir-sidebar',['.ir-main','.ir-header','.ir-footer'],'.icon-menu');
        irSidebar.init(240);

        $(document).on("change","input[type='file']",function (e) {
            upload(".form-headimg",e);
        })

        $('#beginTime,#endTime').datetimepicker({
            language:  'zh-CN',
            format: 'yyyy-mm',
            autoclose: true,
            todayBtn: true,
            startView: 'year',
            minView:'year',
            maxView:'decade',
            linked :true,
            pickerPosition:"bottom-left"
        });
        var editor = new wangEditor('editor');
        editor.config.menus = [
            'source',
            'bold',
            'underline',
            'italic',
            'strikethrough',
            'eraser',
            'forecolor',
            'bgcolor',
            'quote',
            'fontfamily',
            'fontsize',
            'head',
            'unorderlist',
            'orderlist',
            'alignleft',
            'aligncenter',
            'alignright',
            'link',
            'unlink',
            'table',
            'img',
            'undo',
            'redo',
            'fullscreen'
        ];
        editor.create();

        $(".form-confirm-btn").click(function () {
            var $isValid = validate($("#projectEditForm"),{
                title:{
                    validators:{
                        notEmpty:{
                            message:"请输入项目标题"
                        }
                    }
                },
                member: {
                    validators:{
                        notEmpty:{
                            message:"请输入项目成员"
                        }
                    }
                },
                startDate:{
                    validators:{
                        notEmpty:{
                            message:"请输入项目开始日期"
                        }
                    }
                },
                endDate: {
                    validators:{
                        notEmpty:{
                            message:"请输入项目结束日期"
                        }
                    }
                },
                content: {
                    validators:{
                        notEmpty:{
                            message:"请输入项目介绍"
                        }
                    }
                },
                headImg: {
                    validators:{
                        notEmpty:{
                            message:"请上传项目图片"
                        }
                    }
                }
            })
            var editorValidator = (function () {
                if(editor.$txt.formatText().trim().length===0){
                    var $parent = $("textarea[name='content']").parents('.form-group');
                    if($parent.next(".help-block").length==0){
                        $("<small class='help-block'>请输入项目介绍</small>")
                            .insertAfter($parent);
                    }
                    return false;
                }
                return true;
            })();
            return $isValid&&editorValidator;
        })

        // 消除输入框错误提示信息
        $("input[type='text'],input[type='password'],input[type='number'],textarea,.wangEditor-txt").focus(function () {
            if($(this).parents(".form-group").next(".help-block").length>0){
                $(this).parents(".form-group").next(".help-block").remove();
            }
        })

        //消除上传图片部分错误提示信息
        $("input[type='file'],.wangEditor-txt").change(function () {
            if($(this).val().length>0){
                if($(this).parents(".form-group").next(".help-block").length>0){
                    $(this).parents(".form-group").next(".help-block").remove();
                }
            }
        })
    })
})