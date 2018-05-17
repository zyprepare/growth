const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const utils = require('./utils');

// 是否是生产环境
const production = process.env.NODE_ENV === 'production';
// 根目录
const ROOTDIR = process.cwd();
const entry = utils.getEntry(path.resolve(process.cwd(), 'src/pages/'));
const pages = utils.getPages(path.resolve(process.cwd(), 'src/pages/'));

const makeWebpack = (options) => {
  let config = {
    entry: entry,
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: [/\.ejs$/],
          exclude: /node_modules/,
          use: [{
            loader: 'ejs-loader'
          }]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader', //使用的加载器名称
          query: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
            presets: ['env', 'react', 'stage-1'],
            plugins: ['transform-decorators-legacy', 'transform-decorators', 'transform-runtime']
          }
        },
        {
          test: /\.scss$/,
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
                    require('autoprefixer')
                  ]
                }
              },
              {
                loader: 'sass-loader'
              },
              // {
              //   loader: 'postcss-loader',
              //   options: {
              //     plugins: () => [
              //       require('autoprefixer'),
              //       require('precss'),
              //       require('postcss-flexbugs-fixes')
              //     ]
              //   }
              // }
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
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: 2
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor'],
        minChunks: Infinity,
      }),
      new ExtractTextWebpackPlugin("[name].css?v=[chunkhash:8]"),
      new webpack.BannerPlugin('垂直业务研发组'),
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify(process.env.NODE_ENV)
      }),
    ].concat(pages),
    resolve: {
      extensions: ['.js', ".css", ".jsx"]
    },
  }

  config.devtool = !production ? 'cheap-module-source-map' : 'null';
  config.output.filename = !production ? '[name].js' : '[name].js?v=[chunkhash:8]';

  if (!production) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devServer = {
      contentBase: path.resolve(process.cwd(), 'dist'),//本地服务器所加载的页面所在的目录
      historyApiFallback: true,//不跳转
      inline: true,//实时刷新
      hot: true,
      port: 8081,
      proxy: {
        '/api/*': {
          target: 'http://localhost:9090/',
          secure: false
        }
      }
    }
  } else {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
    config.plugins.push(new CleanWebpackPlugin(
      ['dist'], {
        root: __dirname,
        verbose: true,
        dry: false
      }
    ));
  }

  return config;
}

module.exports = makeWebpack;
