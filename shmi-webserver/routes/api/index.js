const router = require('express').Router();

//const auth = require('../auth');

//router.use('/authenticate', require('./auth'));
//router.use('/rpca',  auth.required, require('./rpcamanager'));
router.use('/metadata', require('./mdinterface'));

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;