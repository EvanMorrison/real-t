const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
<<<<<<< HEAD
=======
const ExtractTextPlugin = require('extract-text-webpack-plugin');
>>>>>>> dev

module.exports = {

  entry: {
    vendor: './src/vendor.js',
    index: './src/app.module.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  
  devtool: 'source-map',

  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },

  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
      {test: /\.html$/, exclude: /node_modules/, use: 'raw-loader'},
      {test: /\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap'
        })
      },
      {test: /\.(jpe?g|png|gif)$/, exclude: /node_modules/, 
        use: 'file-loader?name=assets/[hash].[ext]',
      },
    ]
  },

  plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname,'src/index.html'),
        filename: 'index.html',
        inject: 'body'
      }),

      new ExtractTextPlugin({
        filename: '[name].[contenthash].css'
      })
  ]


}