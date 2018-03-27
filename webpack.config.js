const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    index: './src/pages/index/index.jsx',
    home: './src/pages/home/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader', //使用的加载器名称
        query: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
          presets: ['env', 'react', 'stage-1'],
          plugins: ['transform-decorators-legacy', 'transform-decorators']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
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
      },
      {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000, //1w字节以下大小的图片会自动转成base64
        },
      },
      {
        test: require.resolve('zepto'),
        use: ['exports-loader?window.Zepto','script-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/pages/index/index.html',
      filename: 'index.html',
      chunks: ['index', 'vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/home/index.html',
      filename: 'home.html',
      chunks: ['home', 'vendor', 'manifest']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new ExtractTextWebpackPlugin("bundle.css"),
    new webpack.BannerPlugin('垂直业务研发组'),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
  ],
  resolve: {
    extensions: ['.js', ".css", ".jsx"]
  },
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    hot: true,
    port: 8080,
    proxy: {
      '/api/*': {
        target: 'http://localhost:9090/',
        secure: false
      }
    }
  }
}
