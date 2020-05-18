const zBuild = new (require('zengular-build'))();
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, options) => {

	let dev = options.mode === 'development';
	let prod = options.mode === 'production';

	return {
		name: 'Transpiler',
		entry: zBuild.entries,
		output: {filename: '[name].js', path: __dirname},
		resolve: {
			modules: ['node_modules'],
			alias: {
				config: '/@web/config/'
			}
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						ecma: undefined,
						warnings: false,
						parse: {},
						compress: {},
						mangle: false, // Note `mangle.properties` is `false` by default.
						module: false,
						output: null,
						toplevel: false,
						nameCache: null,
						ie8: false,
						keep_classnames: true,
						keep_fnames: false,
						safari10: false,
					},
				}),
			],
		},
		plugins: [
			zBuild.verbump,
			new CopyPlugin(zBuild.copy),
			new MiniCssExtractPlugin({filename: '[name].css'}),
		],
		devtool: dev ? zBuild.devtool : 'source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: [
								["@babel/plugin-proposal-decorators", {"legacy": true}],
								"@babel/plugin-proposal-class-properties",
								"@babel/plugin-proposal-object-rest-spread",
								"@babel/plugin-proposal-optional-chaining"
							]
						}
					}
				},
				{
					test: /\.(html)$/,
					use: "html-loader"
				},
				{
					test: /\.twig$/,
					use: "twig-loader"
				},
				{
					test: /\.less$/,
					use: [
						{loader: MiniCssExtractPlugin.loader, options: {}},
						{loader: "css-loader", options: {url: false, minimize: true}},
						{loader: "postcss-loader"},
						{loader: "less-loader", options: {relativeUrls: false}}
					]
				},
				{
					test: /\.scss/,
					use: [
						{loader: MiniCssExtractPlugin.loader, options: {}},
						{loader: "css-loader", options: {url: false, minimize: true}},
						{loader: "postcss-loader"},
						{loader: "sass-loader", options: {}}
					]
				},
				{
					test: /\.css$/,
					use: [
						{loader: MiniCssExtractPlugin.loader, options: {}},
						{loader: "css-loader", options: {url: false, minimize: true}},
						{loader: "postcss-loader"}
					]
				}
			]
		}
	}
};
