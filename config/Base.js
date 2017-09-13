'use strict';
const path = require('path');

class WebpackBaseConfig {
  constructor() {
    this._config = {};
  }

  set config(data) {
    this._config = Object.assign({}, this.defaultSettings, data);
    return this._config;
  }

  get config(){
    return this._config;
  }

  get env() {
    return 'dev';
  }

  static get srcPathAbsolute() {
    return path.resolve('./src');
  }

  get defaultSettings() {
    const cssModulesQuery = {
      // modules: true,
      // importLoaders: 2,
      // localIndentName: '[name]-[local]-[hash:base64:5]',
      sourceMap: true,
      // minimize: true
    };

    return {
      context: WebpackBaseConfig.srcPathAbsolute,

      entry: './index.ts',

      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js?$/,
            include: WebpackBaseConfig.srcPathAbsolute,
            use: ['babel-loader']
          },
          {
            enforce: 'pre',
            test: /\.ts?$/,
            include: WebpackBaseConfig.srcPathAbsolute,
            loader: 'babel-loader!ts-loader'
          },
          {
            test: /\.css$/,
            use: [
              {loader: 'style-loader'},
              {
                loader: 'css-loader',
                options: cssModulesQuery
              },
              {loader: 'postcss-loader'}
            ]
          },
          {
            test: /\.scss$/,
            use: [
              {loader: 'style-loader'},
              {
                loader: 'css-loader',
                options: cssModulesQuery
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: './config/postcss.config.js'
                  }
                }
              },
              {loader: 'sass-loader'}
            ]
          },
          {
            test:/\.(png|jpg)$/,
            use:['url-loader?limit=8192']
          }
        ]
      },

      output: {
        path: path.resolve('./dist'),
        filename: 'js/[name].[hash].js', //[name].[chunkhash].js
        // publicPath: 'http://club.com/'
      },

      plugins: [],

      resolve: {
        alias: {
          config: `${WebpackBaseConfig.srcPathAbsolute}/config/${this.env}.js`
        },
        extensions: ['.js','.ts', '.json'],
        modules: [
          WebpackBaseConfig.srcPathAbsolute,
          'node_modules'
        ]
      },

      externals: {
        jquery: 'jQuery'
      }
    }
  }
}

module.exports = WebpackBaseConfig;
