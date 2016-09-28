/**
 * Created by esri on 2016/9/28.
 * 右侧导航栏
 */
define([
    'dojo/on',
    'dojo/dom',
    'dojo/dom-attr',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'widgets/BaseWidget/_baseWidget',
    'dojo/text!./templates/Template.html'
], function (on, dom,domAttr, domStyle,domClass, declare, lang, _baseWidget, template) {
    return declare([_baseWidget], {
        templateString: template,

        postCreate: function () {
            this.bindEvent();
        },

        bindEvent: function () {
            on(this.navCtrBtn, 'click', lang.hitch(this, this.navCtrBtnClick));
        },

        navCtrBtnClick: function () {
            var target=domAttr.get(this.navCtrBtn,'data-target');
            if(target=='close'){
                this.addAnimation('open','closeAnimate','openAnimate','rotate(-180deg)','折叠菜单');
            }else {
                this.addAnimation('close','openAnimate','closeAnimate','rotate(0deg)','展开菜单');
            }
        },

        addAnimation: function (targetValue,removeClass ,addClass ,transform,title) {
            domAttr.set(this.navCtrBtn,'data-target',targetValue);
            domClass.remove(this.navMenuList,removeClass);
            domClass.add(this.navMenuList,addClass);
            domStyle.set(this.navCtrBtn,'transform',transform);
            domAttr.set(this.navCtrBtn,'title',title);
        }
    });
});