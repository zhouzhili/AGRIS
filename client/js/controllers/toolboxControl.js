/**
 * Created by zzl on 2016/7/28.
 */
define([
    'dojo/query',
    'dojo/dom',
    'dojo/on',
    'dojo/domReady!'
], function (query,dom,on) {
    return {
        init: function (sceneView) {
            //工具箱body的显示和隐藏
            query('#toolboxHead').on('click', function () {
                query('#toolboxBody').toggleClass('panelHide');
                query('#toolboxSpan').replaceClass('glyphicon-menu-down', 'glyphicon-menu-up');
            });

            //视图转换按钮
            query("#3DTo2DTool").on('click', function () {
                //倾斜默认值为0，即没有起伏，为平面
                var tilt = sceneView.camera.tilt;
                if (tilt < 1) {
                    sceneView.goTo({
                        scale: 200000,
                        tilt: 80
                    });
                } else {
                    sceneView.goTo({
                        tilt: 0,
                        heading: 0
                    })
                }
            });

            //清除要素
            on(dom.byId('selectionTool'),'click', function () {
                sceneView.graphics.items=null;
            });

            //查看属性
            on(dom.byId('identifyBtn'),'click', function () {
                console.log(sceneView);
            });

        }
    };
});