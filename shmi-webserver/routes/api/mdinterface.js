var express = require('express');
var router = express.Router();
var proxy = require("http-proxy-middleware");

router.use(
    proxy({
        target: "http://localhost:9090", //"http://shmi_mdinterface:4444"
        changeOrigin: true, // proxy websockets
        ws: true,
        pathRewrite: function(path, req) {
            return path.replace("/api/metadata", "");
        }
    })
);

module.exports = router;