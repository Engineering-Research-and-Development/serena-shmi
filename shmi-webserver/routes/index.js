const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/', require('./dashboard'));

module.exports = router;