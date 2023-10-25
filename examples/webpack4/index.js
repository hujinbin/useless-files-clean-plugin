const path = require("path");
const UselessFilesCleanPlugin = require('../../lib/index')

module.exports = {
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
		new UselessFilesCleanPlugin({
			root: './src',
            output: './unused-files.json',
            clean: false,
            exclude: ['node_modules'],
			ignoreFile: ['.md']
		})
	]
};