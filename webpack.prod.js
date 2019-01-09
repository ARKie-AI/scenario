const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  context: __dirname,

  output: {
    publicPath: './',
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),

    new HtmlWebpackPlugin({
      title: 'AI scenario',
      inject: true,
    }),

    // new BundleAnalyzerPlugin(),
    new UglifyJsPlugin({
      parallel: true,
      parallel: 4,
      uglifyOptions: {
        ecma: 8,
        compress: { drop_console: true },
        output: {
          comments: false,
        },
      },
    }),
  ],
})
