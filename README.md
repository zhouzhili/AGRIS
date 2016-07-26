###系统依赖包及JS库文件设置
* 1.本系统NodeJS依赖包配置文件为package.json，在根目录运行npm install即可自行安装依赖包。
* 2.系统依赖的arcgis_js_api由于文件过多并未上传。本系统使用的为arcgis_js_api4.0,可自行前往ArcGIS官网下载，
    下载后解压，将arcgis_js_api文件夹及其子文件放到public/components根目录下，打开arcgis_js_api\library\4.0\4.0\init.js，
    把[HOSTNAME_AND_PATH_TO_JSAPI]替换为localhost:3000/components/arcgis_js_api/library/4.0/4.0/。
    打开arcgis_js_api\library\4.0\4.0\dojo\dojo.js，把[HOSTNAME_AND_PATH_TO_JSAPI]替换为localhost:3000/components/arcgis_js_api/library/4.0/4.0/。即可完成配置
  