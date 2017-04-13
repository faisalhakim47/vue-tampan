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
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 100
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
