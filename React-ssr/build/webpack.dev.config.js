const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    port: 8000,
  },
  plugins: [
    // 在js中注入全局变量process.env用来区分环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      }
    })
  ]
})