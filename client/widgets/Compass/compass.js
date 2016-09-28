/**
 * Created by esri on 2016/9/28.
 * 指南针组件
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-style',
    'widgets/BaseWidget/_baseWidget',
    'dojo/text!./templates/Template.html'
], function (declare,lang, on,domStyle, _baseWidget, template) {
    return declare([_baseWidget], {
        templateString: template,

        postCreate: function () {
            this.inherited(arguments);
            this.bindEvent();
        },

        bindEvent: function () {
            window.Global.view.watch('camera.heading',lang.hitch(this,this.headingChange));
            on(this.myCompass,'click',lang.hitch(this,this.myCompassClick));
        },

        /*
        指南针随角度改变而改变
         */
        headingChange: function (newValue) {
            var transform = "rotateZ(-" + newValue + "deg)";
            domStyle.set(this._iconNode, {
                transform: transform,
                mozTransform: transform,
                webkitTransform: transform,
                oTransform: transform,
                msTransform: transform
            });
        },

        /*
        指南针点击事件，角度还原为0
         */
        myCompassClick: function () {
            window.Global.view.goTo({
                heading:0
            });
        }


    });
});
