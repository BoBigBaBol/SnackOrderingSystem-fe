/*
 * Author: bigbabol;
 * Create Time: 2019-04-07 00:08;
 * Description: 
 */

const path                = require('path');
const webpack             = require('webpack');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
  return {
    template    : './src/view/' + name + '.html',
    filename    : 'view/' + name + '.html',
    title       : title,
    inject      : true,
    hash        : true,
    chunks      : ['common', name]
  };
};

const config = {
  entry : {
    'common'            : ['./src/page/common/index.js'],
    'index'             : ['./src/page/index/index.js']
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js",
    chunkFilename: "js/[name].chunk.js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页'))
  ],
  externals : {
    'jquery' : 'window.jQuery'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader','file-loader?name=css/[name].css'
        ]
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 其次: 打包业务中公共代码
        common: {
          name: "base",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        // vendor: {
        //   name: "vendor",
        //   test: /[\\/]node_modules[\\/]/,
        //   chunks: "all",
        //   priority: 10
        // }
      }
    }
  },
  mode: 'development'
};

if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;