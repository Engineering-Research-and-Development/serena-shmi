const router = require('express').Router();
const axios = require('axios');
const cjson = require('circular-json');

const config = require("../../config");

router.get('/enterprises', function(req, res, next){
  axios.get(config.nifiUrl+"/enterprises", {
      proxy:false
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/enterprise/:enterprise_id', function(req, res, next){
  axios.get(config.nifiUrl+"/enterprise/"+req.query.enterprise_id)
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/sites', function(req, res, next){
  axios.get(config.nifiUrl+"/sites")
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/site/:site_id', function(req, res, next){
  axios.get(config.nifiUrl+"/site/"+req.query.site_id)
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/segments', function(req, res, next){
  axios.get(config.nifiUrl+"/segments")
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/segment/:segment_id', function(req, res, next){
  axios.get(config.nifiUrl+"/segment/"+req.query.segment_id)
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/assets', function(req, res, next){
  axios.get(config.nifiUrl+"/assets")
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/asset/:asset_id', function(req, res, next){
  axios.get(config.nifiUrl+"/assets/"+req.query.asset_id)
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

module.exports = router;