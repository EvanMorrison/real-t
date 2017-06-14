const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

const port = process.env.PORT || 8080;

const app = express();


app.use(express.static(path.join(__dirname,'/src')));


// use middleware
app.use(logger('dev'));


/**
 * final catch all to serve index.html if no other
 * known route works
 */
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname,'/src/index.html'))
});

app.listen(port, function() {
  console.log('Server is listening on port ', port);
});

