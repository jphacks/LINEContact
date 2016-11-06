var path = require('path');
 
module.exports = {
	entry: "./resources/assets/js/app.js",
	output: {
		path: __dirname + "/public/js/",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: "/node_modules/",
				query: {
					presets: ["es2015","react","stage-0"]
				}
			}
		]
	},
	debug: true
};