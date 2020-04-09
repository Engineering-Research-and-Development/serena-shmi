const express = require('express');
const cors = require("cors");
const errorhandler = require("errorhandler");
const history = require('connect-history-api-fallback');

const config = require("./config");

var isProduction = config.stage;

const app = express();
app.use(express.static(__dirname + "/dist"));
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(cors());

if (!isProduction) {
  app.use(errorhandler());
}

app.listen(config.port, function() {
  console.log(
    "SHMI front-end is up and running and it's listening on port:" + config.port
  );
});