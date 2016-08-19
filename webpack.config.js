var webpack = require('webpack');
var path = require("path");

var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports={
  devtool:"cheap-module-eval-source-map",
  //入口文件
  entry:{
    app:['./src/enter.js']
  },
  //输出文件
  output: {
        path: BUILD_PATH,
        publicPath:"/dist/",
        filename: "bundle.js"
  },
  //解析模块路径
  resolve: {
    //用来指定模块的后缀
    extensions: ['', '.js', '.jsx','.css']
  },
  //loaders
  module: {
        loaders: [
          //js
          {
            test: /\.js$/,
            loaders: ['babel'],
            include: APP_PATH
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          //css样式
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
          },
          //less、scss样式
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
          },
          //图片文件加载,limit限制大小
          {
            test: /\.(png|jpg|gif)$/,
            loader:'url-loader?limit=8192'
          }
        ]
  },
  //css3前缀自动补全
  postcss:[autoprefixer({browsers:['last 2 versions']})],
  //插件
  plugins:[
     //启动热加载
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoErrorsPlugin(),
     //自动生成html插件
     new HtmlWebpackPlugin(),
     //压缩js
     new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,  // remove all comments
        },
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new ExtractTextPlugin("bundle.css")
  ]
};
