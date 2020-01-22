const router = require('express').Router();
const axios = require('axios');
const cjson = require('circular-json');

const config = require("../../config");

router.get('/enterprises', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/enterprises", {
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
  axios.get(config.nifiUrl+"/serena/1.0/enterprise/"+req.params.enterprise_id, {
      proxy:false
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/sites', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/sites", {
      proxy:false
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/site/:site_id', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/site/"+req.params.site_id, {
      proxy:false
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/segments', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/segments", {
     proxy:false
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/segment/:segment_prefix([0-9A-Z]+)/:segment_suffix([0-9]+)', function(req, res, next){
  var segment_prefix = req.params.segment_prefix;
  var segment_suffix = req.params.segment_suffix;

  var segment_id = segment_prefix +"/"+ segment_suffix;
  console.log(segment_id);

  axios.get(config.nifiUrl+"/serena/1.0/segment/"+segment_id, {
      proxy:false
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/assets', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/assets", {
      proxy:false
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/asset/:asset_prefix([0-9A-Z]+)/:asset_suffix([0-9]+)', function(req, res, next){
  var asset_prefix = req.params.asset_prefix;
  var asset_suffix = req.params.asset_suffix;

  var asset_id = asset_prefix +"/"+ asset_suffix;
  console.log(asset_id);

  axios.get(config.nifiUrl+"/serena/1.0/asset/"+asset_id, {
      proxy:false
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

module.exports = router;