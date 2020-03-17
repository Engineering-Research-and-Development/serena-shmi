process.env.NODE_ENV = "development";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
const path = require("path");
const errorhandler = require('errorhandler');

const config = require("./config");

var isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

if (!isProduction) {
  app.use(errorhandler());
}

/// catch 404 and forward to error handler
app.use(require('./routes'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

const myPort = 4444;
app.listen(process.env.PORT || myPort, function () {
  console.log("SHMI Metadata Interface server is up and running and it's listening on port:" + myPort);
});

