const path = require("path");
const UselessFilesCleanPlugin = require('../../lib/index')

module.exports = {
	// mode: "development" || "production",
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
		app: './src/main.js',
	},
	output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: "[name].bundle.[chunkhash:8].js",
        chunkFilename: 'branch/[name].bundle.[chunkhash:8].js'
	},
	plugins: [
		new UselessFilesCleanPlugin({
			ignoreFile: ['.md']
		})
	]
};