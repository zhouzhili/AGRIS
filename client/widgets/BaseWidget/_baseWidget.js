/**
 * Created by esri on 2016/9/26.
 * 创建自定义组件的基类，该类继承了_WidgetBase,和_TemplatedMixin
 */
define([
   'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin'
], function (declare, _WidgetBase, _TemplateMixin) {
    return declare([_WidgetBase,_TemplateMixin],{
        //返回基类，没有任何方法
    });
});