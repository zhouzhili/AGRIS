/**
 * Created by zzl on 2016/7/27.
 */
//所用需要用到的图层的集合
define([
    "esri/layers/TileLayer",
    "esri/layers/FeatureLayer"
], function (TileLayer,FeatureLayer) {
    return {
        'baseVectorLayer': new TileLayer({
            url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer"
        }),
        'baseImageLayer': new TileLayer({
            url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
        }),
        'hh19870110':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/hh_19870910/MapServer"
        }),
        'hh19900902':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/hh_19900902/MapServer"
        }),
        'hh19910719':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/hh_19910719/MapServer"
        }),
        'hh_water_20130401':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/waterQuality/FeatureServer/0"
        }),
        'hh_water_20121201':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/waterQuality/FeatureServer/1"
        }),
        'hh_water_20120801':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/waterQuality/FeatureServer/2"
        })
    };
});