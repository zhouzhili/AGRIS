var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//路由模块
var routes = require('./routes/index');

var app = express();


//监听端口
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//静态文件位置
app.use(express.static(path.join(__dirname, '../client')));

//路由分发
routes(app);

//服务开始运行
app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});




