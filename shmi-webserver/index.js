const express = require("express");
const cors = require("cors");
const path = require("path");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
//const session = require('express-session');

require('dotenv').config();
const config = require("./config");

var isProduction = config.stage;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("method-override")());
//app.use(express.static(__dirname + "/public"));
app.use(cors());
//app.use(session({ secret: config.secret, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

//MONGODB CONNECTOR
//require("./models/User");

/// catch 404 and forward to error handler
app.use(require("./routes"));

const staticFileMiddleware = express.static('public');
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

//app.get(/.*/,(req,res)=>res.sendFile(path.resolve(__dirname,'public/index.html')))

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

app.listen(config.port, function() {
  console.log(
    "SHMI back-end is up and running and it's listening on port:" + config.port
  );
});
