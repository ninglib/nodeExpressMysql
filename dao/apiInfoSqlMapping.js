var apiInfo = function() {};

apiInfo.prototype = {
	insert: function(param) {
		var insertSql = "INSERT INTO api_manage.api_info( typeId ,api_name ,api_url ,api_dec ,api_method ,api_header ,api_data ,create_time) VALUES(" + param.typeId + "," //typeId - INT(11) NOT NULL
			+ "'" + param.api_name + "'," //api_name - VARCHAR(255) NOT NULL
			+ "'" + param.api_url + "'," //api_url - VARCHAR(255) NOT NULL
			+ "'" + param.api_dec + "'," //api_dec - VARCHAR(255)
			+ "'" + param.api_method + "'," //api_method - VARCHAR(20) NOT NULL
			+ "'" + param.api_header + "'," //api_header - VARCHAR(255)
			+ "'" + param.api_data + "'," //api_data - VARCHAR(255)
			+ "NOW()" //create_time - DATE
			+ ")"

		return insertSql;
	},
	update: function(param) {
		var updateSql = "UPDATE api_manage.api_info SET typeId = " + param.typeId // typeId - INT(11) NOT NULL
			+ ",api_name = '" + param.api_name + "'" // api_name - VARCHAR(255) NOT NULL
			+ ",api_url = '" + param.api_url + "'" // api_url - VARCHAR(255) NOT NULL
			+ ",api_dec = '" + param.api_dec + "'" // api_dec - VARCHAR(255)
			+ ",api_method = '" + param.api_method + "'" // api_method - VARCHAR(20) NOT NULL
			+ ",api_header = '" + param.api_header + "'" // api_header - VARCHAR(255)
			+ ",api_data = ' " + param.api_data + "'" // api_data - VARCHAR(255)
			+ ",create_time = NOW() " // create_time - DATE
			+ "WHERE" + "id = 0" // id - INT(11) NOT NULL"

		return updateSql;
	},
	delete: function(param) {
		var deleteSql = "DELETE FROM api_manage.api_info WHERE id = " + param.id;
		return deleteSql;
	},
	queryByFields: function(param) {
		var querySql = "SELECT id, typeId, api_name, api_url, api_dec, api_method, api_header, api_data, date_format(create_time,'%Y-%d-%m %k:%i:%s') as create_time FROM api_manage.api_info where 1=1"
		if (param.id && param.id != "") {
			querySql += " and id=" + param.id;
		}
		if (param.typeId && param.typeId != "") {
			querySql += " and typeId=" + param.typeId;
		}
		if (param.api_url && param.api_url != "") {
			querySql += " and api_url='" + param.api_url + "'";
		}
		return querySql;
	},
	queryAll: function(param) {
		var querySql = "SELECT id, typeId, api_name, api_url, api_dec, api_method, api_header, api_data, date_format(create_time,'%Y-%d-%m %k:%i:%s') as create_time FROM api_manage.api_info";
		return querySql;
	}
}

module.exports = new apiInfo();