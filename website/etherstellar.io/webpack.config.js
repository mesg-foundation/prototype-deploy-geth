const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = (options = {}) => ({
  entry: {
    app: './src/app'
  },

  output: {
    path: resolve(__dirname, options.dev ? 'tmp' : 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              root: resolve(__dirname, 'src'),
              attrs: ['img:src', 'link:href']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      },
      {
        test: /favicon\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new Dotenv(),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new WriteFilePlugin(),

    new ExtractTextPlugin({
      filename: '[name].css?[contenthash]',
      allChunks: true,
      disable: options.dev
    })
  ],

  resolve: {
    alias: {
      '~': resolve(__dirname, 'src/scripts')
    }
  }
})
