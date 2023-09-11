var path = require("path");
var webpack = require("webpack");

module.exports = {
	// mode: "development" || "production",
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
		
	},
	output: {
		path: path.join(__dirname, "dist"),
	},
	plugins: [
	]
};