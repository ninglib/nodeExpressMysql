var apiInfoDao = require('../dao/apiInfoDao');

module.exports = {
	add: function(param, callback) {
		var param = {};
		apiInfoDao.add(param, function(result) {
			if (result) {
				callback && callback(result);
			}
		});
	},
	queryAll: function(param, callback) {
		var param = param || {};
		apiInfoDao.queryAll(param, function(result) {
			if (result) {
				callback && callback(result);
			}
		});
	},
	queryByFields: function(param, callback) {
		var param = param || {};
		apiInfoDao.queryByFields(param, function(result) {
			if (result) {
				callback && callback(result);
			}
		});
	},
	saveApiInfo: function(param, callback) {
		var param = param || {};
		apiInfoDao.insert(param, function(result) {
			if (result) {
				callback && callback(result);
			}
		});
	},
	deleteApiInfo: function(param, callback) {
		var param = param || {};
		apiInfoDao.delete(param, function(result) {
			if (result) {
				callback && callback(result);
			}
		});
	}
}