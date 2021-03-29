const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');

// see webpack --env option for passing environment to config, if it is a function
// note: this is not the same as -p option or process.env used with node.js
module.exports = (env = {}) => {
  
  const isProduction = env.production === true;

  return {
      entry: (() => {
        const entry = './src/app.module.js';
        if (isProduction) return entry
        else {
          return [entry, 'webpack-hot-middleware/client'];
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
          { test: /\.html$/, exclude: /node_modules/, type: 'asset/source'},
          { test: /\.(jpe?g|png|gif)$/, 
            exclude: /node_modules/, 
            type: 'asset/resource',
          },
          { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            type: 'asset/resource',
          },
          {
            test: /\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader,
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
                  base: { href: '/' },
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
            )
        }
        return pluginList
      })(),
      
      mode: isProduction ? 'production' : 'development',

      optimization: {
        minimize: isProduction,
        minimizer: [
          '...',
          new CssMinimizerPlugin(),
        ]
      }
      
  }

}
