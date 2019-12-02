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
  axios.get(config.nifiUrl+"/enterprise/"+req.params.enterprise_id, {
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
  axios.get(config.nifiUrl+"/sites", {
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
  axios.get(config.nifiUrl+"/site/"+req.params.site_id, {
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
  axios.get(config.nifiUrl+"/segments", {
     proxy:false
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/segment/:segment_id', function(req, res, next){
  axios.get(config.nifiUrl+"/segment/"+req.params.segment_id, {
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
  axios.get(config.nifiUrl+"/assets", {
      proxy:false
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/asset/:asset_id', function(req, res, next){
  axios.get(config.nifiUrl+"/assets/"+req.params.asset_id, {
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