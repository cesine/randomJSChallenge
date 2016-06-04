module.exports = function (dirname, fileType, callbackFnct) {
	var fs = require("fs");
	var path = require("path");
	if (dirname && fileType && callbackFnct) {
		// console.log(dirname, fileType, callbackFnct);
		fs.readdir(dirname, function (err, list) { 
			if(err) {
				return callbackFnct(err, null);
			}
			var newListToReturn = list.filter(function(obj){
				return path.extname(obj) === '.' + fileType;
			});
			if (typeof callbackFnct === 'function') {
				callbackFnct(null, newListToReturn);
			}
		});
	} else {
		return "Error, missing info";
	}
};