//路由文件

module.exports= function (app) {
    app.get('/', function (req, res) {
        res.redirect('/index.html');
    })
};