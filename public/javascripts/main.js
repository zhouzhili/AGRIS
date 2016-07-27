/**
 * Created by zzl on 2016/7/24.
 */
require([
    "controller/mapViewControl",
    "controller/layerShowControl",
    "dojo/domReady!"
], function (mapViewControl, layerShowControl) {
    //地图视图初始化
    var sceneView = mapViewControl.viewInit('viewDiv');
    layerShowControl.showControlInit(sceneView.map);
});