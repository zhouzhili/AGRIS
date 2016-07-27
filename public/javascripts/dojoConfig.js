/**
 * Created by zzl on 2016/7/26.
 */
//自定义模块的配置文件
var dojoConfig = {
    async: true,
    packages: [
        {
            name: "controller",
            location: location.pathname.replace(/\/[^/]*$/, '') + '/javascripts/controllers'
        },
        {
            name:"models",
            location:location.pathname.replace(/\/[^/]*$/, '') + '/javascripts/models'
        }
    ]
};