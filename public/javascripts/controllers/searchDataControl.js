/**
 * Created by zzl on 2016/7/29.
 */
define([
    'dojo/dom',
    'dojo/on',
    'dojo/dom-class',
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "models/layerCollection",
    "esri/symbols/SimpleFillSymbol",
    'controllers/errorMessageControl',
    'dojo/domReady!'
], function (dom, on, domClass, QueryTask, Query, layerCollection, SimpleFillSymbol, errorMessageControl) {

    //地级市与县级市对应数据
    var countries = {
        "武汉市": ["江岸区", "江汉区", "硚口区", "汉阳区", "武昌区", "青山区", "洪山区", "东西湖区", "蔡甸区", "江夏区", "黄陂区", "新洲区"],
        "黄石市": ["黄石港区", "西塞山区", "下陆区", "铁山区", "阳新县", "大冶市"],
        "十堰市": ["茅箭区", "张湾区", "郧县", "郧西县", "竹山县", "竹溪县", "房县", "丹江口市"],
        "宜昌市": ["西陵区", "伍家岗区", "点军区", "猇亭区", "夷陵区", "远安县", "兴山县", "秭归县", "长阳土家族自治县", "五峰土家族自治县", "宜都市", "当阳市", "枝江市"],
        "襄阳市": ["襄城区", "樊城区", "襄州区", "南漳县", "谷城县", "保康县", "老河口市", "枣阳市", "宜城市"],
        "鄂州市": ["梁子湖区", "华容区", "鄂城区"],
        "荆门市": ["东宝区", "掇刀区", "京山县", "沙洋县", "钟祥市"],
        "孝感市": ["孝南区", "孝昌县", "大悟县", "云梦县", "应城市", "安陆市", "汉川市"],
        "荆州市": ["沙市区", "荆州区", "公安县", "监利县", "江陵县", "石首市", "洪湖市", "松滋市"],
        "黄冈市": ["红安县", "罗田县", "英山县", "浠水县", "蕲春县", "黄梅县", "麻城市", "武穴市"],
        "咸宁市": ["咸安区", "嘉鱼县", "通城县", "崇阳县", "通山县", "赤壁市"],
        "随州市": ["曾都区", "随县", "广水市"],
        "恩施土家族苗族自治州": ["恩施市", "利川市", "建始县", "巴东县", "宣恩县", "咸丰县", "来凤县", "鹤峰县"],
        "省直辖": ["潜江市", "神农架林区", "天门市", "仙桃市"],
        "地级市州": ["区县旗"]

    };

    //更新县级选项
    function updateCountryList(cityName) {
        var countrySelect = dom.byId('country-list');
        var countriesArray = countries[cityName];
        //先清空country-list选项,然后更新新的选项
        countrySelect.options.length = 0;
        var optionLength = countriesArray.length;
        var html = "<option>区县旗</option>";
        for (var i = 0; i < optionLength; i++) {
            html += "<option value='" + countriesArray[i] + "'>" + countriesArray[i] + "</option>";
        }
        countrySelect.innerHTML = html;
    }

    //根据选择的城市，显示城市范围，并定位到该城市
    //第二个参数为选择的城市名称，第三个区分选择的是县还是市
    function goToSelectedCity(sceneView, cityName, target) {
        var boundaryLayer = null;
        if (target == 'city') {
            boundaryLayer = layerCollection['cityBoundary'];
        } else {
            boundaryLayer = layerCollection['countryBoundary'];
        }
        var queryTask = new QueryTask({
            url: boundaryLayer.url + "/" + boundaryLayer.layerId
        });
        var featureQuery = new Query();
        //查询条件
        if (cityName) {
            featureQuery.where = "NAME='" + cityName + "'";
            featureQuery.outSpatialReference = sceneView.spatialReference;
            featureQuery.outFields = ["*"];
            featureQuery.returnGeometry = true;

            queryTask.execute(featureQuery).then(function (result) {
                var simpleFillSymbol = new SimpleFillSymbol({
                    color: [245, 122, 122, 0.3],
                    style: 'solid',
                    outline: {
                        color: 'green',
                        width: 1.5
                    }
                });
                addQueryResultToView(sceneView, result, simpleFillSymbol);
            });
        }
    }

    //将查询到的结果(graphic[]集合)根据给定的符号，加载到视图中
    function addQueryResultToView(sceneView, results, symbol) {
        //清除之前的graphics
        sceneView.graphics.items = null;
        var features = results.features;
        //给每个要素添加符号
        var graphics = features.map(function (feature) {
            feature.symbol = symbol;
            return feature;
        });

        //添加新选择的,并将试图转到新的视图
        sceneView.graphics.addMany(graphics);
        sceneView.goTo({
            target: graphics
        });
    }

    return {
        init: function (sceneView) {
            //查询列表展开和折叠
            on(dom.byId('searchDataHead'), 'click', function () {
                var searchDataBody = dom.byId('searchDataBody');
                domClass.toggle('searchDataBody', 'panelHide');
            });
            //地级市城市选择列表选项改变事件
            on(dom.byId('city-list'), 'change', function (event) {
                //获取选项
                var selectedCity = event.target.options[event.target.selectedIndex].value;
                //在视图中显示并转到选择的视图
                goToSelectedCity(sceneView, selectedCity, 'city');
                //更新县级选项
                updateCountryList(selectedCity);
            });

            //县级城市选择列表选项改变事件
            on(dom.byId('country-list'), 'change', function (event) {
                var selectedCountry = event.target.options[event.target.selectedIndex].value;
                goToSelectedCity(sceneView, selectedCountry, 'country');
            });

            //查询按钮
            on(dom.byId('search'), 'click', function () {
               //查询图层和条件
                var featureLayer=layerCollection['pp429004'];
                var query = new Query();
                query.outFields = ['*'];
                query.outSpatialReference = sceneView.spatialReference;
                query.returnGeometry = true;
                //选择的市和县
                var cityList = dom.byId('city-list');
                var countryList = dom.byId('country-list');
                var selectCity = cityList.options[cityList.selectedIndex].value;
                var selectCountry = countryList.options[countryList.selectedIndex].value;
                //query.geometry
                if (selectCity!="地级市州" || selectCountry!="区县旗") {
                    query.geometry = sceneView.graphics.getItemAt(0).geometry;
                } else {
                    return errorMessageControl.showError("请先选择范围");
                }

                //queryTask
                var queryTask=new QueryTask({
                    url:featureLayer.url+"/"+featureLayer.layerId
                });
                //执行查询
                queryTask.execute(query).then(function (results) {
                    var symbol = new SimpleFillSymbol({
                        color: [122, 0, 0, 1],
                        style: 'solid',
                        outline: {
                            color: 'green',
                            width: 1
                        }
                    });
                    addQueryResultToView(sceneView,results,symbol);
                });
            });
        }
    }
});