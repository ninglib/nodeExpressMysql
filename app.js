var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//引入路由文件
var api = require('./routes/apiInfo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//注册路由
app.use('/api', api);

//配置log4js
var log4js = require('log4js');
var log4js_config = require('./log4js.json');
log4js.configure(log4js_config);

var LogFile = log4js.getLogger('log_file');
var LogDate = log4js.getLogger('log_date');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    LogDate.error('Not Found' + err.status);
    LogFile.error('Not Found' + err.status);
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: "errorPage"
        });
        LogDate.error("app errorMessage1:" + err.message + " status:" + err.status + "error:" + err);
        LogFile.error("app errorMessage1:" + err.message + " status:" + err.status + "error:" + err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: "errorPage"
    });
    LogDate.error("app errorMessage2:" + err.message + " status:" + err.status);
    LogFile.error("app errorMessage2:" + err.message + " status:" + err.status);
});

//单独定义logger,作为API暴露出来
// exports.logger = function(name) {
//     var logger = log4js.getLogger(name);
//     logger.setLevel('INFO');
//     return logger;
// }

module.exports = app;