process.env.NODE_ENV = "development";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const errorhandler = require("errorhandler");
const pug = require("pug");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.set("views", path.join(__dirname + "/public/app/views/"));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/// catch 404 and forward to error handler
app.use(require("./routes"));

app.get("*", (req, res) => {
  //res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
  res.render("homepage");
});

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

var isProduction = process.env.NODE_ENV === "production";
/// error handlers
if (!isProduction) {
  app.use(errorhandler());
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

const myPort = 9092;
app.listen(process.env.PORT || myPort, function() {
  console.log(
    "SHMI front-end is up and running and it's listening on port:" + myPort
  );
});
