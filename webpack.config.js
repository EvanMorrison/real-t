const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env = {}) => {
  const isProduction = env.production === true
  return {
      entry: {
        vendor: './src/vendor.js',
        index: './src/app.module.js'
      },

      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
      },
      
      devtool: (() => {
            if (isProduction) return 'hidden-source-map'
            else return 'cheap-module-eval-source-map'
        })(),

      devServer: {
        contentBase: './dist',
        historyApiFallback: true
      },

      module: {
        rules: [
          {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
          {test: /\.html$/, exclude: /node_modules/, use: 'raw-loader'},
          {test: /\.css$/, 
            use: (() => {  
                      if (isProduction) return ExtractTextPlugin.extract({
                                          fallback: 'style-loader',
                                          use: 'css-loader?sourceMap'
                                      })
                      else return ['style-loader', 'css-loader']
                  })()
          },
          {test: /\.(jpe?g|png|gif)$/, exclude: /node_modules/, 
            use: 'file-loader?name=assets/[hash].[ext]',
          },
        ]
      },

      plugins: (() => {
        const pluginList = [
                new HTMLWebpackPlugin({
                  template: path.resolve(__dirname,'src/index.html'),
                  filename: 'index.html',
                  inject: 'body'
                })
        ];
        if (isProduction) {
                pluginList.push(
                    new CleanWebpackPlugin(['dist']), 
                    new webpack.optimize.CommonsChunkPlugin({ name: 'common'}),
                    new ExtractTextPlugin({
                      filename: '[name].[contenthash].css'
                    }),
                    new CompressionPlugin({
                      asset: '[path].gz[query]',
                      algorithm: 'gzip',
                      test: /\.js$/,
                      threshold: 10240,
                      minRatio: 0.8
                    })
                )
        }
        return pluginList
      })(),

  }

}