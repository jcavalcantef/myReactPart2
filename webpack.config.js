var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'app/');       // origem
var BUILD_DIR = path.resolve(__dirname, 'public/');  // destino

var config = {
  entry: APP_DIR + '/App.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname + '/public/',
    inline: true,
    host: '127.0.0.1',
    port: 3333
  },
  module : {
    loaders : [
      {
        test    : /\.js?/,
        include : APP_DIR,
        exclude : /node_modules/,
        loader  : 'babel-loader',
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  }
};

module.exports = config;
