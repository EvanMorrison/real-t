const path = require('path');
const express = require('express');

// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const logger = require('morgan');

const port = process.env.PORT || 3000;

const app = express();

// use webpack dev-server middleware for development
if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHMR = require('webpack-hot-middleware');
    const historyApiFallback = require('connect-history-api-fallback');
  
    const config = require('./webpack.config.js');
    const compiler = webpack(config);
    const instance = webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    });
    app.use(instance);
    app.use(historyApiFallback());
    app.use(instance);
    app.use(webpackHMR(compiler, {
      reload: true
    }));
} else {
    app.use(express.static(path.join(__dirname,'/dist')));
     // serve index.html for all requests
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname,'/dist/index.html'))
    });
}



app.listen(port, function() {
  console.log('Server is listening on port ', port);
});

