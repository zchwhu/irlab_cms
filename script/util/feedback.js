/**
 * Created by Administrator on 2017/3/31 0031.
 */
requirejs.config({
    paths:{
        'jquery':'lib/jquery-1.7.1.min'
    }
});

define(['jquery'],function ($) {
    /**
     *
     * @param form 必须，表单元素，为类或者id形式的字符串，如“.form”、"#form"
     * @param data 必须，后台返回的数据，要求必须是一个数组
     * @param parent 非必须，指定数据添加的位置，默认是添加到表单控件的“.form-group”父元素之后
     */
    function feedback(form,data,parent) {
        var $form = $(form);
        if(Object.prototype.toString.call(data)==='[object Object]'){
            for(var key in data){
                var $formcontrol = $form.find('[name="'+key+'"]'),
                    $parent = parent || ".form-group",
                    $parentNode = $formcontrol.parents($parent);
                if($parentNode.next(".help-block").length==0){
                    $("<small class='help-block'>"+data[key]+"</small>")
                        .insertAfter($parentNode);
                }
            }
        }
    }

    return feedback;
})