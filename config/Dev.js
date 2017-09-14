'use strict';
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {
  constructor() {
    super();
    this.config = {
      devtool: 'cheap-module-source-map',
      entry: {
        index: [
          'webpack-dev-server/client?http://0.0.0.0:8000/',
          'webpack/hot/only-dev-server',
          './index.ts'
        ],
        // vendor:'moment'
      },
      devServer: {
        contentBase: './src',
        // publicPath:'/assets/',
        // clientLogLevel:'none',
        // noInfo: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 8000,
        disableHostCheck: true,
        // proxy:{
        //   'api':{
        //     target: '',// 服务器地址
        //     pathRewrite:{'^/api':''}
        //   }
        // }
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
          template: 'index.html',
          filename: 'index.html'
        }),
        new htmlWebpackPlugin({
          template: 'editor-link.html',
          filename: 'editor-link.html',
          chunks: []
        })
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'vendor',
        //   minChunks: Infinity,
        // })
      ]

    }
  }
}

module.exports = WebpackDevConfig;
