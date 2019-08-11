'use strict';

const path = require('path');
const config = require('../config');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const packageConfig = require('../package.json');

exports.assetsPath = function(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'development'
    ? config.dev.assetsSubDirectory
    : config.build.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path);
}

exports.cssLoaders = function(options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
    }
  }

  const cssLoderModule = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      modules: true,
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders(loader, loaderOptions, isModule) {
    const useCssLoaderModule = isModule ? cssLoderModule : cssLoader;
    const loaders = options.usePostCSS ? [useCssLoaderModule, postcssLoader] : [useCssLoaderModule];

    if (loader) {
      loaders.push({
        loader: loader.replace('Module', '') + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
          javascriptEnabled: true,
        })
      })
    }

    if (options.extract) {
      // return ExtractTextPlugin.extract({
      //   use: loaders,
      //   fallback: 'style-loader'
      // });
      return [MiniCssExtractPlugin.loader].concat(loaders);
    } else {
      return ['style-loader'].concat(loaders);
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    lessModule: generateLoaders('less', {}, true),
    less: generateLoaders('less'),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
  }
}

exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  for (const extension in loaders) {
    const loader = loaders[extension];
    let testReg = new RegExp('\\.' + extension + '$');
    if (extension === 'less') {
      testReg = /(?<!\.module)\.less$/
    }
    if (extension === 'lessModule') {
      testReg = /\.module\.less$/
    }

    output.push({
      test: testReg,
      use: loader,
    })
  }

  return output;
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0]
    const filename = error.file && error.file.split('|').pop();

    notifier.notify({
      title: packageConfig.name,
      messsage: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

