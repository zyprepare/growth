const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'null',
  entry: {
    index: './src/pages/index/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader', //使用的加载器名称
        query: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
          presets: ['env', 'react']
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        // loader: 'style-loader!css-loader'
        // use: ExtractTextWebpackPlugin.extract({
        //   fallback: "style-loader",
        //   use: "css-loader"
        // })
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer'),
                  require('precss'),
                  require('postcss-flexbugs-fixes')
                ]
              }
            }
          ]
        }),
        // use: [
        //   {
        //     loader: 'style-loader',
        //   },
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       importLoaders: 1,
        //     }
        //   },
        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       plugins: () => [
        //         require('autoprefixer'),
        //         require('precss'),
        //         require('postcss-flexbugs-fixes')
        //       ]
        //     }
        //   }
        // ]
      },
      {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000, //1w字节以下大小的图片会自动转成base64
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index/index.html',
      filename: 'index.html'
    }),
    new ExtractTextWebpackPlugin("bundle.css"),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin('pc首页研发组前端'),
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ],
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    hot: true,
  }
}
