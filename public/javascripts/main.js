/**
 * Created by zzl on 2016/7/24.
 */
require([
    "controller/mapViewControl",
    "dojo/domReady!"
], function (mapViewControl) {
    //地图视图初始化
    mapViewControl.viewInit('viewDiv');
});