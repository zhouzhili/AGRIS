/**
 * Created by esri on 2016/9/28.
 * 右侧导航栏
 */
define([
    'dojo/on',
    'dojo/dom',
    'dojo/dom-style',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'widgets/BaseWidget/_baseWidget',
    'dojo/text!./templates/Template.html'
], function (on, dom, domStyle, declare, lang, _baseWidget, template) {
    return declare([_baseWidget], {
        templateString: template,

        postCreate: function () {
            this.bindEvent();
        },

        bindEvent: function () {
            on(this.navCtrBtn, 'click', lang.hitch(this, this.navCtrBtnClick));
        },

        navCtrBtnClick: function () {
            var rotate=$("#navCtrBtn").css("transform");
            if(rotate==="rotate(0deg)"){
                $("#navMenuList").css('display','block');
                $("#navMenuList").animate({"width":"121px"});
                $("#navCtrBtn").css("transform","rotate(-180deg)");
            }else {
                $("#navMenuList").animate({"width":"0px"});
                $("#navMenuList").css('display','none');
                $("#navCtrBtn").css("transform","rotate(0deg)");
            }
        }
    });
});