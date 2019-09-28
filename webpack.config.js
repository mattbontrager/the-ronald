const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 9000
	},
	entry: {
		main: './src/js/main.js'
	},
	output: {
		chunkFilename: './js/[name].[hash].js',
		filename: './js/[name].[hash].js',
		path: path.resolve(__dirname, './dist/')
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: './css/[name].css',
			chunkFilename: './css/[id].css'
		}),
		new HtmlWebpackPlugin({
			inject: true,
			hash: true,
			template: './src/index.html',
			filename: './index.html',
			title: 'The Ronald'
		}),
		new WebpackMd5Hash()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader'
					}
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: './images',
							publicPath: '../images'
						}
					},
					{
						loader: 'image-webpack-loader'
					}
				]
			}
		]
	}
};
