const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    'vue-tampan': './src/index.js',
    'vue-tampan.min': './src/index.js',
    'example-app': './example/main.js'
  },
  output: {
    path: './dist',
    filename: '[name].js',
    library: 'VueTampan',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: true,
      warnings: false
    })
  ]
}