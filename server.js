const express = require('express');
const app     = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const expressJWT = require('express-jwt');
const cookieParser = require('cookie-parser');

const config = require('./backend/config');
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production'
////////////////////////
// connect to MongoDB //
///////////////////////
mongoose.Promise = global.Promise;
const database = `mongodb://${config.db_user}:${config.db_pwd}@${config.db_path}/${config.db_name}`;
mongoose.connect(database, {
                              useMongoClient: true,
                              reconnectTries: 30
                }).then((res) => {
                    console.log(`Connected to MongoDB ${config.db_name} as user: ${config.db_user}`)
                  })
                  .catch((err) => {
                    console.log('Error connecting to MongoDB ', err.message)
                  });
mongoose.connection.on('disconnected', () => {
  mongoose.connect(database, { useMongoClient: true})
  .then((res) => console.log('Reconnected to MongoDB'))
  .catch((err) => console.log('Error reconnecting to MongoDB', err.message))
});



// MIDDLEWARE
app.use(logger( (isProduction ? 'common' : 'dev') ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/auth', require('./backend/routes/authRoutes'));
// app.use('/api', expressJWT({secret: config.token_secret}));
app.use('/api/user', require('./backend/routes/userRoutes'));
app.use('/api/case', require('./backend/routes/caseRoutes'));

///////////////////////////////////////////////////////////////////
// use webpack dev-server middleware for development environment //
///////////////////////////////////////////////////////////////////
if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHMR = require('webpack-hot-middleware');
    const historyApiFallback = require('connect-history-api-fallback');
  
    const config = require('./webpack.config.js')({production: false});
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

     // serve index.html for all requests without a route specified above
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname,'/dist/index.html'))
    });
}



app.listen(port, function() {
  console.log('Server is listening on port ', port);
});

