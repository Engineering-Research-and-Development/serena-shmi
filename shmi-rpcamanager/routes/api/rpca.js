var router = require('express').Router();


router.get('/something', function(req, res, next){
    return res.json({status: "Seems ok"});
});








module.exports = router;