/**
 * Created by zzl on 2016/7/27.
 */
//控制图层的显示与移除
define([
    'models/layerCollection',
    'dojo/query',
    'dojo/dom',
    'dojo/domReady!'
],function(layerCollection,query,dom){
    return{
        showControlInit: function (map) {
            //checkbox的点击事件
            function checkboxClick(checkbox){
                var value=checkbox.value;
                var layer=layerCollection[value];
                //如果选中,则添加图层;否则,移除图层
                if(checkbox.checked){
                    if(layer){
                        map.add(layer);
                    }
                }else {
                    map.remove(layer);
                }
            }

            //为accordion div下的每一个checkbox添加click事件
            var layerParentNode=dom.byId('accordion');
            query("input[type='checkbox']",layerParentNode).on('click', function (e) {
                var currentCheckbox= e.target;
                checkboxClick(currentCheckbox);
            });
        }

    };
});