/**
 * Created by esri on 2016/9/26.
 */
//所用需要用到的图层的集合
define([
    "esri/layers/TileLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/MapImageLayer"
], function (TileLayer,FeatureLayer,MapImageLayer) {
    return {
        'baseVectorLayer': new TileLayer({
            url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer",
            id:"baseVectorLayer"
        }),
        'baseImageLayer': new TileLayer({
            url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
            id:'baseImageLayer'
        }),
        'countryBoundary':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/sysData/HuBeiBoundary/MapServer",
            layerId:1,
            title:"县级行政区"
        }),
        'cityBoundary':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/sysData/HuBeiBoundary/MapServer",
            layerId:0,
            title:"地级市行政区"
        }),
        'DM2014':new MapImageLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/sysData/DM2014/MapServer",
            title:"2014年冬小麦",
            id:"DM2014"
        })
    };
});