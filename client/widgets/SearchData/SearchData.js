/**
 * Created by esri on 2016/9/26.
 */
define([
    'dojo/on',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'widgets/BaseWidget/_baseWidget',
    'app/layers',
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/symbols/SimpleFillSymbol",
    'dojo/text!./templates/Template.html'
], function (on, dom, domClass, lang, declare, _baseWidget,layers,QueryTask,Query,SimpleFillSymbol, template) {
    return declare([_baseWidget], {
        templateString: template,

        constructor: function (args) {
            this.view=args.view;
            this.countries = {
                "武汉市": ["江岸区", "江汉区", "硚口区", "汉阳区", "武昌区", "青山区", "洪山区", "东西湖区", "蔡甸区", "江夏区", "黄陂区", "新洲区"],
                "黄石市": ["黄石港区", "西塞山区", "下陆区", "铁山区", "阳新县", "大冶市"],
                "十堰市": ["茅箭区", "张湾区", "郧县", "郧西县", "竹山县", "竹溪县", "房县", "丹江口市"],
                "宜昌市": ["西陵区", "伍家岗区", "点军区", "猇亭区", "夷陵区", "远安县", "兴山县", "秭归县", "长阳土家族自治县", "五峰土家族自治县", "宜都市", "当阳市", "枝江市"],
                "襄阳市": ["襄城区", "樊城区", "襄州区", "南漳县", "谷城县", "保康县", "老河口市", "枣阳市", "宜城市"],
                "鄂州市": ["梁子湖区", "华容区", "鄂城区"],
                "荆门市": ["东宝区", "掇刀区", "京山县", "沙洋县", "钟祥市"],
                "孝感市": ["孝南区", "孝昌县", "大悟县", "云梦县", "应城市", "安陆市", "汉川市"],
                "荆州市": ["沙市区", "荆州区", "公安县", "监利县", "江陵县", "石首市", "洪湖市", "松滋市"],
                "黄冈市": ["黄州区", "团风县", "红安县", "罗田县", "英山县", "浠水县", "蕲春县", "黄梅县", "麻城市", "武穴市"],
                "咸宁市": ["咸安区", "嘉鱼县", "通城县", "崇阳县", "通山县", "赤壁市"],
                "随州市": ["曾都区", "随县", "广水市"],
                "恩施土家族苗族自治州": ["恩施市", "利川市", "建始县", "巴东县", "宣恩县", "咸丰县", "来凤县", "鹤峰县"],
                "省直辖": ["潜江市", "神农架林区", "天门市", "仙桃市"],
                "地级市州": ["区县旗"]

            };
            this.mapImageLayer = layers['DM2014'];
        },

        postCreate: function () {
            this.init();
            this.addEvent();
        },

        /*
         初始化设置
         */
        init: function () {

        },

        /*
         添加事件
         */
        addEvent: function () {
            on(this.searchPanelHead, 'click', lang.hitch(this, this.searchPanelHeadClick));
            on(this.cityList,'change',lang.hitch(this,this.cityListChange));
            on(this.reset,'click',lang.hitch(this,this.resetClick));
            on(this.search,'click',lang.hitch(this,this.searchClick));
        },

        /*
         查询面板顶部栏点击事件:展开或折叠面板
         */
        searchPanelHeadClick: function () {
            domClass.toggle(this.searchPanelBody, 'panelHide');
        },

        /*
         地级市城市列表改变事件
         */
        cityListChange: function () {
            //获取选择城市
            var selectedCity = this.cityList.options[this.cityList.selectedIndex].value;
            //清除之前的边界
            this.view.map.remove(this.mapImageLayer);
            this.view.graphics.items = null;
            //在视图中显示并转到选择的视图
            this.goToSelectedCity(selectedCity, 'city');
            //更新县级选项
            this.updateCountryList(selectedCity);
        },

        /*
        重置按钮事件
         */
        resetClick: function () {
            var cityList = this.cityList;
            var countryList = this.countryList;
            cityList.selectedIndex = 0;
            countryList.innerHTML = "<option>区县旗</option>";
            this.view.map.remove(this.mapImageLayer);
            this.view.graphics.items = null;
        },

        /*
        查询按钮事件
         */
        searchClick: function () {
            var clause=this.getSelectClause();
            if(clause!=""){
                //移除上一次查询结果
                this.view.map.remove(this.mapImageLayer);
                //定义查询
                this.mapImageLayer.sublayers = [{
                    id: 0,
                    visible: true,
                    definitionExpression: clause
                }];
               this.view.map.add(this.mapImageLayer);
            }else {
                //errorMessageControl.showError("请先选择行政区范围");
            }
        },

        /*
        更新县级市城市列表
         */
        updateCountryList: function (cityName) {
            var countrySelect = this.countryList;
            var countriesArray =this.countries[cityName];
            //先清空country-list选项,然后更新新的选项
            countrySelect.options.length = 0;
            var optionLength = countriesArray.length;
            var html = "<option>区县旗</option>";
            for (var i = 0; i < optionLength; i++) {
                html += "<option value='" + countriesArray[i] + "'>" + countriesArray[i] + "</option>";
            }
            countrySelect.innerHTML = html;
        },

        /*
         将查询到的结果(graphic[]集合)根据给定的符号，加载到视图中
         */
        addQueryResultToView: function (results,symbol) {
            var features = results.features;
            if (features.length > 0) {
                //给每个要素添加符号
                var graphics = features.map(function (feature) {
                    feature.symbol = symbol;
                    return feature;
                });

                //添加新选择的,并将试图转到新的视图
                this.view.graphics.addMany(graphics);
                this.view.goTo({
                    target: graphics
                });
            }
        },

        /*
         根据选择的城市，显示城市范围，并定位到该城市
         第二个参数为选择的城市名称，第三个区分选择的是县还是市
         */
        goToSelectedCity: function (cityName, target) {
            var boundaryLayer = null;
            if (target === 'city') {
                boundaryLayer = layers['cityBoundary'];
            } else {
                boundaryLayer = layers['countryBoundary'];
            }
            var queryTask = new QueryTask({
                url: boundaryLayer.url + "/" + boundaryLayer.layerId
            });
            var featureQuery = new Query();
            //查询条件
            if (cityName) {
                featureQuery.where = "NAME='" + cityName + "'";
                featureQuery.outSpatialReference = this.view.spatialReference;
                featureQuery.outFields = ["*"];
                featureQuery.returnGeometry = true;
                queryTask.execute(featureQuery).then(function (result) {
                    var simpleFillSymbol = new SimpleFillSymbol({
                        color: [0, 0, 0, 0],
                        style: 'solid',
                        outline: {
                            color: 'blue',
                            width: 1.5
                        }
                    });
                    this.addQueryResultToView(result,simpleFillSymbol);
                });
            }
        },

        /*
         获取查询字符串
         */
        getSelectClause: function () {
            //选择的市和县
            var cityList = this.cityList;
            var countryList = this.countryList;
            var selectCity = cityList.options[cityList.selectedIndex].value;
            var selectCountry = countryList.options[countryList.selectedIndex].value;
            //语句
            var clause = "";
            if (selectCountry != "区县旗") {
                //区县旗查询
                clause = "NAME='" + selectCountry + "'";
            } else if (selectCity != "地级市州") {
                //市州查询
                clause = "CityName='" + selectCity + "'";
            }
            return clause;
        }

    });
});