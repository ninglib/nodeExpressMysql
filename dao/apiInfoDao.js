var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./apiInfoSqlMapping');
var $tool = require('../util/tool');

//配置log4js
var log4js = require('log4js');
var log4js_config = require('../log4js.json');
log4js.configure(log4js_config);

var LogFile = log4js.getLogger('log_file');
var LogDate = log4js.getLogger('log_date');

// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

module.exports = {
	insert: function(param, callBack) {
		pool.getConnection(function(err, connection) {
			if (err) {
				//{"code":"ER_ACCESS_DENIED_error","errno":1045,"sqlState":"28000","fatal":true}
				var data = err;
				err = $tool.writeJson({
					"error": data.errno,
					"message": data.code,
					"body": {
						"errorData": err
					}
				});
				//抛异常
				callBack && callBack(err);
				//添加错误日志
				LogFile.error("insert链接异常" + JSON.stringify(err));
				LogDate.error("insert链接异常" + JSON.stringify(err));
			} else {
				// 建立连接，向表中插入值
				var insertSql = $sql.insert(param);
				connection.query(insertSql, function(err, result) {
					if (result && result.affectedRows > 0) {
						//添加成功 
						var data = result;
						result = $tool.writeJson({
							"body": result
						});
					}
					// 释放连接
					callBack && callBack(result);
					connection.release();
				});
			}
		});
	},
	delete: function(param, callBack) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			if (err) {
				//{"code":"ER_ACCESS_DENIED_error","errno":1045,"sqlState":"28000","fatal":true}
				var data = err;
				err = $tool.writeJson({
					"error": data.errno,
					"message": data.code,
					"body": {
						"errorData": err
					}
				});
				//抛异常
				callBack && callBack(err);
				//添加错误日志
				LogFile.error("delete链接异常" + JSON.stringify(err));
				LogDate.error("delete链接异常" + JSON.stringify(err));
			} else {
				var deleteSql = $sql.delete(param);
				connection.query(deleteSql, function(err, result) {
					if (result && result.affectedRows >= 0) {
						var data = result;
						result = $tool.writeJson({
							"body": result
						});
					}
					callBack && callBack(result);
					connection.release();
				});
			}
		});
	},
	update: function(param, callBack) {
		//update
		pool.getConnection(function(err, connection) {
			if (err) {
				//{"code":"ER_ACCESS_DENIED_error","errno":1045,"sqlState":"28000","fatal":true}
				var data = err;
				err = $tool.writeJson({
					"error": data.errno,
					"message": data.code,
					"body": {
						"errorData": err
					}
				});
				//抛异常
				callBack && callBack(err);
				//添加错误日志
				LogFile.error("update链接异常" + JSON.stringify(err));
				LogDate.error("update链接异常" + JSON.stringify(err));
			} else {
				var updateSql = $sql.update(param);
				connection.query(updateSql, function(err, result) {
					// 使用页面进行跳转提示
					if (result && result.affectedRows > 0) {
						var data = result;
						result = $tool.writeJson({
							"body": result
						});
					}
					callBack && callBack(result);
					connection.release();
				});
			}
		});
	},
	queryByFields: function(param, callBack) {
		//queryById
		pool.getConnection(function(err, connection) {
			if (err) {
				//{"code":"ER_ACCESS_DENIED_error","errno":1045,"sqlState":"28000","fatal":true}
				var data = err;
				err = $tool.writeJson({
					"error": data.errno,
					"message": data.code,
					"body": {
						"errorData": err
					}
				});
				//抛异常
				callBack && callBack(err);
				//添加错误日志
				LogFile.error("queryByFields链接异常" + JSON.stringify(err));
				LogDate.error("queryByFields链接异常" + JSON.stringify(err));
			} else {
				//获取sql语句
				var querySql = $sql.queryByFields(param);
				connection.query(querySql, function(err, result) {
					var data = result;
					result = $tool.writeJson({
						"body": {
							"apiInfoList": result
						}
					});
					callBack && callBack(result);
					//释放链接
					connection.release();
				});
			}
		});
	},
	queryAll: function(param, callBack) {
		pool.getConnection(function(err, connection) {
			if (err) {
				//{"code":"ER_ACCESS_DENIED_error","errno":1045,"sqlState":"28000","fatal":true}
				var data = err;
				err = $tool.writeJson({
					"error": data.errno,
					"message": data.code,
					"body": {
						"errorData": err
					}
				});
				//抛异常
				callBack && callBack(err);
				//添加错误日志
				LogFile.error("queryAll链接异常" + JSON.stringify(err));
				LogDate.error("queryAll链接异常" + JSON.stringify(err));
			} else {
				var queryAll = $sql.queryAll(param);
				connection.query(queryAll, function(err, result) {
					var data = result;
					//获取json对象返回
					result = $tool.writeJson({
						"body": {
							"apiInfoList": result
						}
					});
					callBack && callBack(result);
					//释放链接
					connection.release();
				});
			}
		});
	}
};