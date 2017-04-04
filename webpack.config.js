const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    'vue-tampan': './src/index.js',
    'vue-tampan.min': './src/index.js',
    'example-app': './example/main.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: 'VueTampan',
    libraryTarget: 'umd'
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options
        }
      }
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
