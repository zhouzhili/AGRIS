/**
 * Created by zzl on 2016/8/6.
 * 统计分析和图表展示控制
 */
define([
    'dojo/dom',
    'dojo/on',
    'Chart/echarts',
    'dojo/domReady!'
], function (dom,on,echarts) {
    return {
        showChart: function (label, data) {
            dom.byId('chartContainer').style.display="block";
            var chartDiv=dom.byId('chartDiv');
            var myChart=echarts.init(chartDiv);
            var option = {
                title: {
                    text: '冬小麦面积(km2)'
                },
                tooltip: {
                    trigger:'axis'
                },
                toolbox:{
                  show:true,
                    feature:{
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                legend: {
                    data:['面积']
                },
                xAxis: {
                    data: label
                },
                yAxis: {},
                series: [{
                    name: '面积',
                    type: 'line',
                    data: data
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            //图表自适应
            window.onresize=myChart.resize;

            //关闭图表
            on(dom.byId('removeChart'),'click',function(){
                dom.byId('chartContainer').style.display="none";
            });
        }
    }
});