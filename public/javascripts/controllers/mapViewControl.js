/**
 * Created by zzl on 2016/7/26.
 */
//地图视图控制初始化模块
define([
    "esri/Map",
    "esri/views/SceneView",
    "esri/Basemap",
    "models/layerCollection",
    "esri/widgets/Home",
    "esri/widgets/BasemapToggle"
], function (Map, SceneView, Basemap, layerCollection, Home, BasemapToggle) {
    return {
        //参数为vie容器的DIV的id
      viewInit: function (viewContainer) {
          //基础矢量底图
          var vectorBasemap = new Basemap({
              baseLayers: [layerCollection.baseVectorLayer],
              title: "矢量地图",
              id: "defaultVectorBasemap"
          });
          //基础栅格底图
          var imageBasemap = new Basemap({
              baseLayers: [layerCollection.baseImageLayer],
              title: "影像地图",
              id: "defaultImageBasemap"
          });
          //地图默认加载矢量底图
          var map = new Map({
              basemap: vectorBasemap,
              ground: "world-elevation"
          });

          var view = new SceneView({
              container: viewContainer,
              map: map,
              center: [113.32, 29.84],
              zoom: 3,
              tile:0,
              heading:0
          });

          //底图切换
          var basemaptoggle = new BasemapToggle({
              view: view,
              titleVisible:true,
              nextBasemap:imageBasemap
          });
          basemaptoggle.startup();
          view.ui.add(basemaptoggle, "top-right");

          //home按钮，回到初始视图
          var homeBtn = new Home({
              view: view
          }, "homediv");
          homeBtn.startup();
          view.ui.add(homeBtn, "top-left");
          return view;
      }
    };
});