var express = require('express');
var router = express.Router();
var apiInfoService = require('../service/ApiInfoService');
var $tool = require('../util/tool');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//获取apiInfo
router.get('/getApiInfos', function(req, res, next) {
	apiInfoService.queryAll({}, function(result) {
		res.json(result);
	});
});
/*获取某个接口信息*/
router.get("/getApiInfo", function(req, res, next) {
	var id = req.query.id || "";
	var typeId = req.query.typeId || "";
	apiInfoService.queryByFields({
		id: id,
		typeId: typeId
	}, function(result) {
		res.json(result);
	});
});
/*删除某个接口信息*/
router.get("/deleteApiInfo", function(req, res, next) {
	var id = req.query.id || "";
	if (id != "") {
		apiInfoService.deleteApiInfo({
			id: id
		}, function(result) {
			res.json(result);
		});
	}
});
/*添加某个接口信息*/
router.post("/saveApiInfo", function(req, res, next) {
	var params = req.body || ""; //接受参数
	if (params != "") {
		//根据api_url，判断是否重复 
		apiInfoService.queryByFields({
			typeId: params.typeId,
			api_url: params.api_url
		}, function(result) {
			if (result.head.error == 0 && result.body.apiInfoList.length > 0) {
				res.json(
					$tool.writeJson({
						"error": -1,
						"message": "不能添加重复的接口",
						"body": result.body.apiInfoList
					})
				)
			} else {
				apiInfoService.saveApiInfo({
					typeId: params.typeId,
					api_name: params.api_name,
					api_url: params.api_url,
					api_dec: params.api_dec,
					api_method: params.api_method,
					api_header: params.api_header,
					api_data: params.api_data
				}, function(result) {
					res.json(result);
				});
			}
		});
	}
});

module.exports = router;