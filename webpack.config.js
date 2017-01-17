const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    'vue-tampan': './src/index.js',
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
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false,
    //   warnings: false
    // })
  ]
}