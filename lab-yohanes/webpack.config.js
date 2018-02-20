'use strict';

const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  //devtool: 'source-maps',
  entry: `${__dirname}/src/main.js`,//always a template literal. this is going to be the source of our build
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle-[hash].js', //when using square brtackets, they are wepackets key words. technically a uuid for each rebuild
    publicPath: '/' //routing in the browser where the file/path name will render
  },
  plugins: [ //always an array
    new HtmlPlugin({template: `${__dirname}/src/index.html`}),
    new ExtractTextPlugin('bundle-[hash].css') //bundling up .js and .css in the build directory
  ],
  module: {
    rules: [ //breaking down the rules for each file to say which loader they should pass through
      {
        test: /\.js$/, //this says takin any file that ends in a '.js'
        exclude: /node_modules/,//this says 'ignore everything in the node mudles'
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/, //takes in all filies ending in '.scss'
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']), //this is loaded into our webpack from right to left. sass node package allows us to create css functionality into our javascript
      },
    ]
  }
};