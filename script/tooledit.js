/**
 * Created by Administrator on 2017/3/30.
 */
requirejs.config({
    shim: {
        'wangEditor.min': ['jquery']
    },
    paths:{
        'jquery':'lib/jquery-1.7.1.min',
        'bootstrap-datetimepicker':'lib/bootstrap-datetimepicker',
        'wangEditor': 'lib/wangEditor.min'
    }
});

require(['jquery','script/util/sidebar.js','script/util/upload.js','script/util/validate.js','wangEditor','bootstrap-datetimepicker'],function ($,sidebar,upload,validate,editor,picker) {
    $(function () {
        $(".ir-menu-item").eq(5).addClass('active');

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
            var $isValid = validate($("#toolEditForm"),{
                title:{
                    validators:{
                        notEmpty:{
                            message:"请输入工具标题"
                        }
                    }
                },
                startDate:{
                    validators:{
                        notEmpty:{
                            message:"请输入工具开发日期"
                        }
                    }
                },
                link: {
                    validators:{
                        notEmpty:{
                            message:"请输入工具相关链接"
                        },
                        isURL: {
                            message:"连接格式错误，请重新输入"
                        }
                    }
                },
                content: {
                    validators:{
                        notEmpty:{
                            message:"请输入工具介绍"
                        }
                    }
                },
                headImg: {
                    validators:{
                        notEmpty:{
                            message:"请上传工具图片"
                        }
                    }
                }
            })
            var editorValidator = (function () {
                if(editor.$txt.formatText().trim().length===0){
                    var $parent = $("textarea[name='content']").parents('.form-group');
                    if($parent.next(".help-block").length==0){
                        $("<small class='help-block'>请输入工具介绍</small>")
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