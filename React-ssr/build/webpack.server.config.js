const { resolve } = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const config = require('./config')[process.env.NODE_ENV]

module.exports = merge(baseConfig(config), {
  target: 'node',
  devtool: config.devtool,
  entry: resolve('app/server-entry.js'),
  output: {
    filename: 'js/server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  // 服务端打包的时候忽略外部的npm包
  externals: nodeExternals({
    // css文件还是要的
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.env),
      'process.env.REACT_ENV': '"server"'
    })
  ]
})