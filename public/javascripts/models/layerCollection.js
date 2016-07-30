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
            url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer",
            id:"baseVectorLayer"
        }),
        'baseImageLayer': new TileLayer({
            url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
            id:'baseImageLayer'
        }),
        'hh19870910':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/hhBoundary/MapServer/0",
            id:'hh19870910',
            title:"洪湖1987年9月10日水域面积"
        }),
        'hh19900902':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/hhBoundary/MapServer/1",
            id:'hh19900902',
            title:"洪湖1990年9月2日水域面积"
        }),
        'hh19910719':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/hhBoundary/MapServer/2",
            id:'hh19910719',
            title:"洪湖1991年7月19日水域面积"
        }),
        'hh_water_20130401':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/waterQuality/FeatureServer",
            layerId:0,
            id:'hh_water_20130401',
            title:"洪湖2013年4月1日水质数据"
        }),
        'hh_water_20121201':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/waterQuality/FeatureServer",
            layerId:1,
            id:'hh_water_20121201',
            title:"洪湖2012年12月1日水质数据"
        }),
        'hh_water_20120801':new FeatureLayer({
            url:"http://202.114.148.206:6080/arcgis/rest/services/testData/waterQuality/FeatureServer",
            layerId:2,
            id:'hh_water_20120801',
            title:"洪湖2012年8月1日水质数据"
        })
    };
});