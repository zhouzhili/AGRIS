/**
 * Created by zzl on 2016/7/24.
 */
require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "dojo/domReady!"
], function(Map, SceneView,FeatureLayer){
    var map = new Map({
        basemap: "hybrid",
        ground: "world-elevation"
    });
    var view = new SceneView({
        container: "viewDiv",
        map: map,
        zoom:10,
        center: [113.33, 29.83]
    });
});