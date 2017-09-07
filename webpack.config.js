const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = ((env = {}) => {
  
  const isProduction = env.production === true;

  return {
      entry: (() => {
       const entry = {
        index: ['./src/app.module.js' ],
        vendor: [
          'angular',
          'angular-material',
          'angular-resource',
          'angular-messages',
          '@uirouter/angularjs',
          'angularfire',
          './node_modules/angular-material/angular-material.scss',
        ]
      }
      if (isProduction) return entry
      else {
        entry.index.push('webpack-hot-middleware/client?reload=true');
        entry.vendor.push('webpack-hot-middleware/client?reload=true');
        return entry;
      }  
      })(),

      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: (() => {
          if (isProduction) return '[name].[chunkhash].js';
          else return '[name].bundle.js';
        })(),
        publicPath: '/'
      },
      
      devtool: (() => {
            if (isProduction) return 'hidden-source-map'
            else return 'cheap-module-eval-source-map'
        })(),

      devServer: (() => {
        if (isProduction) return {}
        else return {
                      contentBase: './dist',
                      historyApiFallback: {
                        index: '/'
                      }
                    }
      })(),

      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
          { test: /\.html$/, exclude: /node_modules/, use: 'raw-loader'},
          { test: /\.(jpe?g|png|gif)$/, 
            exclude: /node_modules/, 
            use: [{
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      name: 'assets/[name].[hash].[ext]'
                    }
            }]
          },
          { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: [{
                    loader: 'url-loader',
                    options: {
                      limit: 33000,
                      name: 'assets/fonts/[name].[hash].[ext]'
                    }
            }]
          },
          { test: /\.scss$/, 
            use: ExtractTextPlugin.extract({
                  use: [
                    {
                      loader: 'css-loader', 
                      options: { sourceMap: true }
                    },
                    {
                      loader: 'sass-loader',
                      options: { sourceMap: true }
                    }
                  ],    
                  // use style-loader for inline styles in development
                  fallback: 'style-loader',
                })
          },
        ]
      },

      plugins: (() => {
        const pluginList = [
            // plugins used by dev and production
                new HTMLWebpackPlugin({
                  template: path.resolve(__dirname,'src/index.html'),
                  filename: 'index.html',
                  inject: 'body'
                }),
                new ExtractTextPlugin({
                      filename: '[name].[contenthash].css',
                      disable: !isProduction
                }),
                  /**
                   * Note: CommonsChunckPlugin is usually only run in production, but
                   * dev-server was not loading angular correctly without it
                   */
                new webpack.optimize.CommonsChunkPlugin({ 
                  name: 'vendor'
                }),
                new webpack.optimize.CommonsChunkPlugin({
                  name: 'runtime'
                })
        ];
          // plugins for production only
        if (isProduction) {
          pluginList.push(
            new CleanWebpackPlugin(['dist']), 
            new webpack.HashedModuleIdsPlugin(),
            new CompressionPlugin({
              asset: '[path].gz[query]',
              algorithm: 'gzip',
              threshold: 10240,
              test: /\.js$|\.html$|\.css$/,
              minRatio: 0.8
            })
          )
          // plugins for development only
        } else {
            pluginList.push(
              new webpack.HotModuleReplacementPlugin(),
              new webpack.NoEmitOnErrorsPlugin()
            )
        }
        return pluginList
      })()

  }

})()