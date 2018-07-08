'use strict';

const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/main.js`,
  output: {
    path: `${__dirname}/build`,
    filename: 'bungle-[hash].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlPlugin({template: `${__dirname}/src/index.html`}),
    new ExtractTextPlugin('bundle-[hash].css'),
  ],
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node-modules/,
        loaders: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
    ],
  },
};