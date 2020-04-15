const router = require('express').Router();

//const auth = require('../auth');

//router.use('/authenticate', require('./auth'));
//router.use('/rpca',  auth.required, require('./rpcamanager'));
router.use('/metadata', require('./mdinterface'));

router.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = router;