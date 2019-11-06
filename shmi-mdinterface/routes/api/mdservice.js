var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');

var User = mongoose.model('User');

var auth = require('../auth');
var config = require("../../config");

var  db, gridFSBucket, storage, upload;
const connection = mongoose.connect(config.mongoURI, { useNewUrlParser: true }, (err, client) => {
    console.log("Database is connected");
    db = client.db;
    gridFSBucket = new mongoose.mongo.GridFSBucket(client.db);

    storage = new GridFsStorage({
        url: mongoURI,
        file: (req, file) => {
            return {
                bucketName: 'fs',
                filename: file.originalname,
            }
        }
    });

    upload = multer({ storage: storage }).any();

}).catch((err) => {
    console.log(err);
});


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

router.post('/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate("local", {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/logout', function(req, res, next){
  User.findById(req.query.user_id).then(function(user){
    if(!user){ return res.sendStatus(404); }
      //you should invalidate the token by adding it to a bucket, redis may be? or also mongo u know ya?
  });
});

router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.get('/username/:user_id', function(req, res, next){
  User.findById(req.query.user_id).then(function(user){
    if(!user){ return res.sendStatus(404); }
    return res.json({username: user.username});
  });
});

router.get('/user_id/:username', function(req, res, next){
  User.find({username:req.query.username}).then(function(user){
    if(!user){ return res.sendStatus(404); }
    return res.json({user_id: user._id});
  });
});

router.post('/user', function(req, res, next){

  upload(req, res, function(err) {
    if (err) {return res.status(500).json({errors: {error: "Image upload failed"}})};
    
    var user = new User();
    user.firstname = req.body.user.firstname;
    user.lastname = req.body.user.lastname;
    user.username = user.firstname + "." + user.lastname;
    user.birthdate = req.body.user.birthdate;
    user.email = req.body.user.email;
    user.image = req.body.user.image;
    user.setPassword(req.body.user.password);

    User.findOne({username : user.username}).then(function(daUser){
      if(daUser){ 
        user.username += "." + user.email.split("@")[1].split(".")[0];
      }
      user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
      }).catch(next);
    });

  });
});


router.put('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

module.exports = router;