const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  context: __dirname,
  
  devtool: 'cheap-module-source-map',

  devServer: {
    stats: 'minimal',
    historyApiFallback: true,
    host: 'localhost',
    port: 8090,
    compress: true,
    contentBase: 'dist'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'AI scenario',
      inject: true
    }),

    new webpack.HotModuleReplacementPlugin()
  ]
})
