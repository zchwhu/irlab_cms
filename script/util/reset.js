/**
 * Created by Administrator on 2017/3/29 0029.
 */
requirejs.config({
    shim: {
        'jquery.modal': ['jquery']
    },
    paths:{
        'jquery':'lib/jquery-1.7.1.min'
    }
});

define(['jquery'],function ($) {
    function resetForm(form) {
        var $form = $(form);
        $form.find("input[type='text']").val('');
        $form.find("input[type='password']").val('');
        $form.find("input[type='file']").val('');
        $form.find("input[type='checkbox']").prop('checked',false);
        $form.find("input[type='radio']").prop('checked',false);
    }

    return resetForm;
})