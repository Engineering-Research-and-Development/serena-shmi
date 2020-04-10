const router = require('express').Router();
const axios = require('axios');
const cjson = require('circular-json');

const config = require("../../config");

router.get('/enterprises', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/enterprises", {
      crossdomain:true
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
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/enterprise_types', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/enterprise_types", {
      crossdomain:true
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
      crossdomain:true
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
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});


router.get('/site_types', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/site_types", {
      crossdomain:true
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
     crossdomain:true
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

  axios.get(config.nifiUrl+"/serena/1.0/segment/"+segment_id, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/segment_types', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/segment_types", {
     crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/segment_type/:sg_db_site([0-9A-Z]+)/:sg_db_id([0-9]+)/:sg_type_code([0-9]+)', function(req, res, next){
  var sg_db_site = req.params.sg_db_site;
  var sg_db_id = req.params.sg_db_id;
  var sg_type_code = req.params.sg_type_code;

  var segment_type_id = sg_db_site +"/"+ sg_db_id + "/" + sg_type_code;

  axios.get(config.nifiUrl+"/serena/1.0/segment_type/"+segment_type_id, {
      crossdomain:true
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
      crossdomain:true
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

  axios.get(config.nifiUrl+"/serena/1.0/asset/"+asset_id, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/asset_types', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/asset_types", {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/asset_type/:as_db_site([0-9A-Z]+)/:as_db_id([0-9]+)/:as_type_code([0-9]+)', function(req, res, next){
  var as_db_site = req.params.as_db_site;
  var as_db_id = req.params.as_db_id;
  var as_type_code = req.params.as_type_code;

  var asset_type_id = as_db_site +"/"+ as_db_id + "/" + as_type_code;

  axios.get(config.nifiUrl+"/serena/1.0/asset_type/"+asset_type_id, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/sg_as_event_types', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/sg_as_event_types", {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/sg_as_event_type/:ev_db_site([0-9A-Z]+)/:ev_db_id([0-9]+)/:ev_type_code([0-9]+)', function(req, res, next){
  var ev_db_site = req.params.ev_db_site;
  var ev_db_id = req.params.ev_db_id;
  var ev_type_code = req.params.ev_type_code;

  var sg_as_event_type_id = ev_db_site +"/"+ ev_db_id + "/" + ev_type_code;

  axios.get(config.nifiUrl+"/serena/1.0/sg_as_event_type/"+sg_as_event_type_id, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/meas_loc_types', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/meas_loc_types", {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/meas_loc_type/:ml_db_site([0-9A-Z]+)/:ml_db_id([0-9]+)/:ml_type_code([0-9]+)', function(req, res, next){
  var ml_db_site = req.params.ml_db_site;
  var ml_db_id = req.params.ml_db_id;
  var ml_type_code = req.params.ml_type_code;

  var meas_loc_type_id = ml_db_site +"/"+ ml_db_id + "/" + ml_type_code;

  axios.get(config.nifiUrl+"/serena/1.0/meas_loc_type/"+meas_loc_type_id, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/eng_unit_types', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/eng_unit_types", {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/eng_unit_type/:eu_db_site([0-9A-Z]+)/:eu_db_id([0-9]+)/:eu_type_code([0-9]+)', function(req, res, next){
  var eu_db_site = req.params.eu_db_site;
  var eu_db_id = req.params.eu_db_id;
  var eu_type_code = req.params.eu_type_code;

  var eng_unit_type_id = eu_db_site +"/"+ eu_db_id + "/" + eu_type_code;

  axios.get(config.nifiUrl+"/serena/1.0/eng_unit_type/"+eng_unit_type_id, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/mloc_calc_types', function(req, res, next){
  axios.get(config.nifiUrl+"/serena/1.0/mloc_calc_types", {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/mloc_calc_type/:mc_db_site([0-9A-Z]+)/:mc_db_id([0-9]+)/:mc_type_code([0-9]+)', function(req, res, next){
  var mc_db_site = req.params.mc_db_site;
  var mc_db_id = req.params.mc_db_id;
  var mc_type_code = req.params.mc_type_code;

  var mloc_calc_type_id = mc_db_site +"/"+ mc_db_id + "/" + mc_type_code;

  axios.get(config.nifiUrl+"/serena/1.0/mloc_calc_type/"+mloc_calc_type_id, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/digest_prediction/:digest_prefix([0-9A-Z]+)/:digest_suffix([0-9]+)', function(req, res, next){
  var digest_prefix = req.params.digest_prefix;
  var digest_suffix = req.params.digest_suffix;

  var digest_id = digest_prefix +"/"+ digest_suffix;

  axios.get(config.nifiUrl_old+"/digest_prediction?id="+digest_id, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

module.exports = router;