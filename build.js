const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const babel = require('babel-core')
const babelMinify = require('babel-minify')
const gzipSize = require('gzip-size')

build().catch((error) => {
  console.log(error)
})

async function build() {
  const bundle = await rollup.rollup({
    input: './src/index.js',
    treeshake: true,
    plugins: [],
  })

  const bundled = await bundle.generate({
    format: 'es',
  })
  const optimized = optimize(bundled.code)

  info('module', bundled.code, optimized.code)

  const UMD = await bundle.generate({
    name: 'VueTampan',
    format: 'umd',
    exports: 'named',
  })
  const optimizedUMD = optimize(UMD.code)

  info('umd', UMD.code, optimizedUMD.code)

  const ES5 = babel.transform(UMD.code)
  const optimizedES5 = optimize(ES5.code)

  info('es5', ES5.code, optimizedES5.code)

  writeFile('./dist/vue-tampan.js', bundled.code)
  writeFile('./dist/vue-tampan.min.js', optimized.code)
  writeFile('./dist/vue-tampan.umd.js', UMD.code)
  writeFile('./dist/vue-tampan.umd.min.js', optimizedUMD.code)
  writeFile('./dist/vue-tampan.es5.js', ES5.code)
  writeFile('./dist/vue-tampan.es5.min.js', optimizedES5.code)

  await buildCSS()

  fs.unlinkSync(path.join(__dirname, './dist/vue-tampan-style.js'))

  console.log('done', '✔')
}

/**
 * @param {string} code 
 */
function minify(code) {
  return babelMinify(code)
}

/**
 * @param {string} code 
 */
function optimize(code) {
  return minify(code)
}

/**
 * @param {string} name 
 * @param {string} code 
 * @param {string} optimized 
 */
function info(name, code, optimized) {
  console.log(name, `${toByte(code.length)}`, `(${toByte(optimized.length)} minified, ${toByte(gzipSize.sync(optimized))} gzip)`, '✔')
}

/**
 * @param {number} length 
 */
function toByte(length) {
  const byteString = ((length * 1000 / 1024) / 1000).toString()
  return byteString.slice(0, byteString.indexOf('.') + 3) + ' KB'
}

/**
 * @param {string} filepath 
 * @param {string} content 
 */
function writeFile(filepath, content) {
  fs.writeFileSync(path.join(__dirname, filepath), content, { encoding: 'utf8' })
}

const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')

function buildCSS() {
  return new Promise((resolve, reject) => webpack({
    entry: {
      'vue-tampan-style': './src/index.css.js',
    },
    output: {
      path: path.join(__dirname, './dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: 'css-loader',
                options: { minimize: true }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    cssnext(),
                  ],
                }
              },
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
    ]
  }, (error, stats) => {
    if (error) reject(error)
    else {
      console.log('CSS built', '✔')
      resolve(stats)
    }
  }))
}
