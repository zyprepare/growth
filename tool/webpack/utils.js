const fs = require('fs');
const path = require('path');
const join = path.join;

const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 获取打包入口文件列表
 * @param {String} filePath
 * @return {Object}
 */
const getEntry = (filePath) => {
  return getNameAndFiles(filePath, 'jsx');
}

/**
 * 获取HtmlWebpackPlugin列表
 * @param {String} filePath
 * @param {Array} chunks 默认打入vendor和manifes模块包
 * @return {Object}
 */
const getPages = (filePath, chunks=['vendor', 'manifest']) => {
  let obj = getNameAndFiles(filePath, 'ejs');
  let arr = [];

  for (let key in obj) {
    arr.push(new HtmlWebpackPlugin({
      template: obj[key],
      filename: key + '.html',
      chunks: [key].concat(chunks)
    }));
  }

  return arr;
}

/**
 * 获取文件名和文件路径
 * @param {String} filePath
 * @param {String} type 文件类型
 * @return {Object}
 */
const getNameAndFiles = (filePath, type) => {
  let result = {};
  let reg = new RegExp(`\.${type}$`);

  function find(fp) {
    let files = fs.readdirSync(fp);

    files.forEach(function (val, index) {
      let fPath = join(fp, val);
      let stats = fs.statSync(fPath);
      let fileName = '';

      if (stats.isDirectory()) {
        find(fPath);
      }

      if (stats.isFile() && reg.test(fPath)) {
        fileName = getFilename(fPath);
        result[fileName] = fPath;
      }
    });
  }

  find(filePath);

  return result;
}

/**
 * 获取文件名规则：文件路径为src/pages/home/index.js，则文件名为home
 * @param {String} filePath
 * @return {String}
 */
const getFilename = (filePath) => {
  let arr = filePath.split(path.sep);

  return arr[arr.length - 2];
}

module.exports = {
  getEntry: getEntry,
  getPages: getPages,
  getNameAndFiles: getNameAndFiles
}
