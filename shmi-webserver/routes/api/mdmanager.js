var express = require('express');
var router = express.Router();
var proxy = require("http-proxy-middleware");

router.use(
    proxy({
        target: "http://localhost:4445", //"http://shmi_mdmanager:4445"
        changeOrigin: true, // proxy websockets
        ws: true,
        pathRewrite: function(path, req) {
            return path.replace("/api/mdmanager", "");
        }
    })
);

module.exports = router;