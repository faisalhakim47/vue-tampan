const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    'vue-tampan': './src/index.js',
    'vue-tampan.min': './src/index.js',
    'example-app': './example/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: 'VueTampan',
    libraryTarget: 'umd'
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
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
          cssSourceMap: false,
          preserveWhitespace: false,
          extractCSS: true,
          loaders: {
            js: {
              loader: 'babel-loader',
            },
            // css: {
            //   loader: 'css-loader',
            //   options: { minimize: true },
            // },
          },
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            }
          ]
        })
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
    new ExtractTextPlugin("/vue-tampan.min.css"),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: false,
      warnings: false,
    })
  ]
}
