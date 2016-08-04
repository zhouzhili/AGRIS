/**
 * Created by zzl on 2016/7/27.
 */
//控制图层的显示与移除
define([
    'models/layerCollection',
    'dojo/query',
    'dojo/dom',
    'esri/geometry/support/webMercatorUtils',
    'controllers/errorMessageControl',
    'dojo/domReady!'
], function (layerCollection, query, dom, webMercatorUtils, errorMessageControl) {
    return {
        showControlInit: function (sceneView) {
            //图层列表点击事件
            query('#layerListHead').on('click', function () {
                query('#layerListBody').toggleClass('panelHide');
            });
            //checkbox的点击事件
            function checkboxClick(checkbox) {
                var map = sceneView.map;
                var value = checkbox.value;
                var layer = layerCollection[value];
                //如果选中,并且选择的图层不在当前map中，添加进map,
                // 否则,移除图层
                if (checkbox.checked) {
                    if (!map.findLayerById(layer.id)) {
                        map.add(layer);
                        //切换视图到图层范围,图层坐标系需要为web墨卡托,或者WGS84
                        layer.then(function () {
                            //如果图层投影为web墨卡托
                            if (layer.spatialReference.isWebMercator || layer.spatialReference.isWGS84) {
                                sceneView.goTo({
                                    center:layer.fullExtent.center,
                                    zoom:10
                                });

                            } else {
                                return errorMessageControl.showError("无法定位到该图层中心!");
                            }
                        });
                    }
                } else {
                    map.remove(layer);
                }
            }

            //为accordion div下的每一个checkbox添加click事件
            var layerParentNode = dom.byId('accordion');
            query("input[type='checkbox']", layerParentNode).on('click', function (e) {
                var currentCheckbox = e.target;
                checkboxClick(currentCheckbox);
            });
        }

    };
});