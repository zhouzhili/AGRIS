/**
 * Created by esri on 2016/9/26.
 * 视图组件管理初始化
 */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    'widgets/Map/Map',
    'widgets/SearchData/SearchData'
], function (declare, lang,Map, SearchData) {
    window.Global={};
    return declare(null,{

        /*
        初始化组件
         */
        init: function () {
            //地图窗口初始化
            var map=new Map();
            map.placeAt(dojo.body());
            map.startup();
            //地图视图
            window.Global.view=map.getView();
            //查询面板
            var searchDataPanel=new SearchData();
            searchDataPanel.placeAt(dojo.body());
        }
    });
});