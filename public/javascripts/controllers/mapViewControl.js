/**
 * Created by zzl on 2016/7/26.
 */
//地图视图控制初始化模块
define([
    "esri/Map",
    "esri/views/SceneView",
    "esri/Basemap",
    "esri/layers/TileLayer",
    "esri/widgets/Home",
    "esri/widgets/BasemapToggle"
], function (Map, SceneView, Basemap, TileLayer, Home, BasemapToggle) {
    return {
        //参数为vie容器的DIV的id
      viewInit: function (viewContainer) {
          //基础矢量底图
          var vectorBasemap = new Basemap({
              baseLayers: [
                  new TileLayer({
                      url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer"
                  })
              ],
              title: "default vector Basemap",
              id: "defaultVectorBasemap"
          });
          //基础栅格底图
          var imageBasemap = new Basemap({
              baseLayers: [
                  new TileLayer({
                      url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
                  })
              ],
              title: "default image Basemap",
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
              center: [113.22, 29.96],
              zoom: 3
          });

          //底图切换
          var basemaptoggle = new BasemapToggle({
              view: view,
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
      }
    };
});