const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 500,
	},
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		publicPath: '/',
	},
	devServer: {
		// hot: true,
		host: '0.0.0.0',
		disableHostCheck: true,	// so you can use your phone - see https://github.com/webpack/webpack-dev-server/issues/882
		publicPath: '/',
		historyApiFallback: true,
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.scss/,
				loaders: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.css/,
				loaders: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader?limit=10000',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({ template: './public/index.html' }),
	],
};
