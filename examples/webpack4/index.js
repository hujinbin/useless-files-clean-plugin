var path = require("path");
const UselessFilesCleanPlugin = require('../../lib/index')

module.exports = {
	mode: "development" || "production",
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
		app: './src/main.js',
	},
	output: {
		path: path.join(__dirname, "dist"),
	},
	plugins: [
		new UselessFilesCleanPlugin()
	]
};