/**
 * Created by Administrator on 2017/3/30 0030.
 */
requirejs.config({
    paths:{
        'jquery':'lib/jquery-1.7.1.min'
    }
});

define(['jquery'],function ($) {
    function Alert(options) {
        this.type = options.type || 'alert';
        this.title = options.title;
        this.content = options.message;
        this.success = options.success;
        this.fail = options.fail;
        this.confirm = options.confirmText;
        this.cancel = options.cancelText;

        this.wrapper = $("<div class='z-wrapper'></div>");
        this.panel = $("<div class='z-alert'></div>");
        this.header = $("<h1 class='z-alert-header'></h1>");
        this.body = $("<div class='z-alert-body'></div>");
        this.footer = $("<div class='z-alert-footer'></div>");
        this.cancelBtn = $("<span class='z-alert-cancel'></span>");
        this.confirmBtn = $("<span class='z-alert-confirm'></span>");

        this.header.text(this.title || '提 示');
        this.body.text(this.content);
        this.confirmBtn.text(this.confirm || '确认');
        this.cancelBtn.text(this.cancel || '取消');

        this.bindEvent();
    }
    Alert.prototype.init = function () {
        if(this.type === 'alert'){
            this.header.prependTo(this.body);
        }
        this.panel.append(this.mask);
        this.panel.append(this.body);
        this.panel.append(this.footer);
        this.footer.append(this.confirmBtn);
        if(this.type === 'confirm'){
            this.footer.addClass("confirm")
            this.cancelBtn.insertBefore(this.confirmBtn);
        }
        this.wrapper.append(this.panel);
        $(document.body).append(this.wrapper);
        this.show();
    }
    Alert.prototype.bindEvent = function () {
        var that = this;
        this.confirmBtn.bind('click',function (e) {
            if(that.success&&Object.prototype.toString.call(that.success)==='[object Function]'){
                that.success();
            }
            that.hide();
        })

        this.cancelBtn.bind('click',function () {
            if(that.fail&&Object.prototype.toString.call(that.fail)==='[object Function]'){
                that.fail();
            }
            that.hide();
        })
    }
    Alert.prototype.show = function () {
        this.wrapper.addClass("active");
    }
    Alert.prototype.hide = function () {
        this.confirmBtn.unbind('click');
        this.cancelBtn.unbind('click');
        this.wrapper.remove();
    }

    return function (options) {
        return new Alert(options);
    }
})