const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// see webpack --env option for passing environment to config, if it is a function
// note: this is not the same as -p option or process.env used with node.js
module.exports = (env = {}) => {
  
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
          'angular-cookies',
          '@uirouter/angularjs',
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
        else return 'eval-cheap-module-source-map'
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
          {
            test: /\.scss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              'css-loader',
              'sass-loader',
            ],
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
                new MiniCssExtractPlugin(),
        ];
          // plugins for production only
        if (isProduction) {
          pluginList.push(
            new CleanWebpackPlugin(), 
            new webpack.ids.HashedModuleIdsPlugin(),
            new CompressionPlugin({
              filename: '[path][base].gz[query]',
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
      })(),
      
      mode: isProduction ? 'production' : 'development'
      
  }

}