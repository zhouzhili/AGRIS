/**
 * Created by esri on 2016/9/26.
 * 视图组件管理初始化
 */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    'widgets/Map/Map',
    'widgets/SearchData/SearchData',
    'widgets/ZoomBar/ZoomBar',
    'widgets/Compass/compass',
    'widgets/Navigator/navigator'
], function (declare, lang,Map, SearchData,zoomBar,compass,navigator) {
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

            //地图视图存储到全局变量中
            window.Global.view=map.getView();

            //查询面板
            var searchDataPanel=new SearchData();
            searchDataPanel.placeAt(dojo.body());

            //缩放按钮
            var zoom=new zoomBar();
            zoom.placeAt(dojo.body());

            //指南针组件
            var myCompass=new compass();
            myCompass.placeAt(dojo.body());

            //导航菜单栏组件
            var myNavigator=new navigator();
            myNavigator.placeAt(dojo.body());
        }
    });
});