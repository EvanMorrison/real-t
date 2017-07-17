const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
                    new ExtractTextPlugin({
                      filename: '[name].[contenthash].css'
                    })
                )
        }
        return pluginList
      })()

  }

}