/**
 * Created by esri on 2016/9/28.
 * 放大缩小组件
 */
define([
    'dojo/dom',
    'dojo/on',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'widgets/BaseWidget/_baseWidget',
    'dojo/text!./templates/Template.html'
], function (dom,on,declare, lang, _baseWidget, template){
    return declare([_baseWidget],{
       templateString:template,

        postCreate: function () {
            this.bindEvent();
        },

        bindEvent: function () {
            on(this.zoomInDiv,'click',lang.hitch(this,this.zoomIn));
            on(this.zoomOutDiv,'click',lang.hitch(this,this.zoomOut));
        },

        zoomIn: function () {
           var zoom= window.Global.view.zoom;
            window.Global.view.goTo({
                zoom:zoom+1
            });
        },

        zoomOut: function () {
           var zoom= window.Global.view.zoom;
            window.Global.view.goTo({
                zoom:zoom-1
            });
        }
    });
});