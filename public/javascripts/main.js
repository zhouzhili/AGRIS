/**
 * Created by zzl on 2016/7/24.
 */
require([
    "controller/mapViewControl",
    "controller/layerShowControl",
    "controller/toolboxControl",
    "controller/searchDataControl",
    "dojo/domReady!"
], function (mapViewControl, layerShowControl,toolboxControl,searchDataControl) {
    //地图视图初始化
   var sceneView= mapViewControl.viewInit('viewDiv');
    //图层列表点击事件初始化
    layerShowControl.showControlInit(sceneView.map);
    //工具箱初始化
    toolboxControl.init(sceneView);
    //数据查询栏初始化
    searchDataControl.init();
});