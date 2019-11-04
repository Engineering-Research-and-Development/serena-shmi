process.env.NODE_ENV = "development";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
const path = require("path");
const errorhandler = require('errorhandler');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors());

/// catch 404 and forward to error handler
app.use(require('./routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var isProduction = process.env.NODE_ENV === 'production';
/// error handlers
if (!isProduction) {
  app.use(errorhandler());
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

const myPort = 8080;
app.listen(process.env.PORT || myPort, function () {
  console.log("SHMI front-end is up and running and it's listening on port:" + myPort);
});

