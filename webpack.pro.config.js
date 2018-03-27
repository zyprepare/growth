const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  devtool: 'null',
  entry: {
    index: './src/pages/index/index.jsx',
    home: './src/pages/home/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash:8].js'
  },
  module: {
    rules: [{
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
          use: [{
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
        use: ['exports-loader?window.Zepto', 'script-loader']
      }
    ]
  },
  plugins: [
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin('垂直业务研发组'),
    new CleanWebpackPlugin(
      ['dist'], {
        root: __dirname,
        verbose: true,
        dry: false
      }
    )
  ],
  resolve: {
    extensions: ['.js', ".css", ".jsx"]
  }
}
