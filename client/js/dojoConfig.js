/**
 * Created by zzl on 2016/7/26.
 */
//自定义模块的配置文件
var dojoConfig = {
    async: true,
    packages: [
        {
            name: "controllers",
            location: location.pathname.replace(/\/[^/]*$/, '') + '/js/controllers'
        },
        {
            name:"models",
            location:location.pathname.replace(/\/[^/]*$/, '') + '/js/models'
        },
        {
            name:"Chart",
            location:location.pathname.replace(/\/[^/]*$/, '') + '/libs/Chart'
        }
    ]
};