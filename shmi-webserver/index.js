process.env.NODE_ENV = "development";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const errorhandler = require("errorhandler");
const pug = require("pug");
const bodyParser = require("body-parser");

var isProduction = process.env.NODE_ENV === 'production';

const config = require("./config");
require('./models/User');

const app = express();
<<<<<<< HEAD

app.use(cors());

app.set("views", path.join(__dirname + "/public/app/views/"));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
=======
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(cors());

if (!isProduction) {
  app.use(errorhandler());
}
>>>>>>> 228fee434296e55288b6b977d00f4e333fbddf07

/// catch 404 and forward to error handler
app.use(require("./routes"));

<<<<<<< HEAD
app.get("*", (req, res) => {
  //res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
  res.render("homepage");
=======
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
>>>>>>> 228fee434296e55288b6b977d00f4e333fbddf07
});

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

<<<<<<< HEAD
var isProduction = process.env.NODE_ENV === "production";
=======
>>>>>>> 228fee434296e55288b6b977d00f4e333fbddf07
/// error handlers
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
<<<<<<< HEAD

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
=======
    res.json({'errors': {
      message: err.message,
      error: err
    }});
>>>>>>> 228fee434296e55288b6b977d00f4e333fbddf07
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

const myPort = 9092;
app.listen(process.env.PORT || myPort, function() {
  console.log(
    "SHMI front-end is up and running and it's listening on port:" + myPort
  );
});
