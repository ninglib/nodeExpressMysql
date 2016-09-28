module.exports = {
    writeJson: function(obj) {
        var result = {
            "head": {
                "error": obj.error || 0,
                "message": obj.message || ""
            },
            "body": obj.body
        }
        return result;
    }
}