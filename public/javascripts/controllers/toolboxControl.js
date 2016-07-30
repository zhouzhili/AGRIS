/**
 * Created by zzl on 2016/7/28.
 */
define([
    'dojo/query',
    'esri/tasks/QueryTask',
    'esri/tasks/support/Query',
    "esri/symbols/SimpleMarkerSymbol",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/PopupTemplate",
    'dojo/domReady!'
], function (query, QueryTask, Query, SimpleMarkerSymbol, GraphicsLayer, Graphic, PopupTemplate) {
    return {
        init: function (sceneView) {
            //工具箱body的显示和隐藏
            query('#toolboxHead').on('click', function () {
                query('#toolboxBody').toggleClass('panelHide');
                query('#toolboxSpan').replaceClass('glyphicon-menu-down', 'glyphicon-menu-up');
            });

            //2D,3D视图切换工具
            query("#3DTo2DTool").on('click', function () {
                //倾斜默认值为0，即没有起伏，为平面
                var tilt = sceneView.camera.tilt;
                if (tilt < 1) {
                    sceneView.goTo({
                        scale: 200000,
                        tilt: 60,
                        heading: 35
                    });
                } else {
                    sceneView.goTo({
                        tilt: 0,
                        heading: 0
                    })
                }
            });

            //按矩形选择工具
            query("#selectionTool").on('click', function () {
                var map = sceneView.map;
                var hhwaterLayer = map.findLayerById('hh_water_20120801');
                var url = hhwaterLayer.url + '/' + hhwaterLayer.layerId;
                var queryTask = new QueryTask({
                    url: url
                });

                var query = new Query();
                query.returnGeometry = true;
                query.outSpatialReference = sceneView.spatialReference;
                query.outFields = ["*"];
                query.where = "TP > " + 0.02;

                //执行查询结果
                queryTask.execute(query).then(function (results) {
                    console.log(results.displayFieldName);
                    var graphics = results.features;
                    //点符号
                    var markerSymbol = new SimpleMarkerSymbol({
                        color: [226, 119, 40],
                        outline: {
                            color: [226, 119, 40],
                            width: 1
                        }
                    });

                    var graphicsLayer = new GraphicsLayer();
                    var attributesList = [];
                    map.add(graphicsLayer);
                    for (var i = 0; i < graphics.length; i++) {
                        var graphic = graphics[i];
                        var geometry = graphic.geometry;
                        var attributes = graphic.attributes;
                        attributesList.push(attributes);
                        var pointGraphic = new Graphic({
                            geometry: geometry,
                            symbol: markerSymbol
                        });
                        graphicsLayer.add(pointGraphic);
                    }
                    console.log(attributesList);
                });
            });

            //清除GraphicLayer
            //statisticsTool按钮
            query('#statisticsTool').on('click', function () {
                sceneView.map.removeAll();
            });

            //查看属性
            //针对图层添加弹出模板
            function setPopupTemplate(layer) {
                var template = new PopupTemplate({
                    title: "识别图层:" + layer.title,
                    content: "<ul><li>TP: {TP}</li>" +
                    "<li>TN: {TN}</li>" +
                    "<li>NH4_N: {NH4_N}</li>" +
                    "<li>CODmn: {CODmn}</li></ul>",
                    fieldInfos:[{
                        fieldName:"TP",
                        format:{
                            digitSeparator: true,
                            places: 0
                        }
                    },{
                        fieldName:"TN",
                        format:{
                            digitSeparator: true,
                            places: 0
                        }
                    },{
                        fieldName:"NH4_N",
                        format:{
                            digitSeparator: true,
                            places: 0
                        }
                    },{
                        fieldName:"CODmn",
                        format:{
                            digitSeparator: true,
                            places: 0
                        }
                    }]
                });
                layer.popupTemplate = template;
            }

            //identifyTool按钮
            query('#identifyTool').on('click', function () {
                var layers = sceneView.map.layers;
                var layersLength = layers.length;
                if (layersLength < 1)
                    return console.log('当前地图中没有添加地图');
                for (var i = 0; i < layersLength; i++) {
                    var layer=layers.getItemAt(i);
                    setPopupTemplate(layer);
                }
            });
        }
    };
});