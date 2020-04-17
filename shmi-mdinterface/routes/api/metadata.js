const router = require('express').Router();
const axios = require('axios');
const cjson = require('circular-json');

const config = require("../../config");

router.get('/enterprises', function(req, res, next){
  if(req.header('BrowserEnterprise') == null){
    return res.json({
      error: "401",
      message: "You lack of proper privileges to access this resource on SHMI"
    })
  }

  axios.get(config.metadataServiceUrl+"/enterprise/"+req.header('BrowserEnterprise'), {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
      return res.json({
        error: "404",
        message: "Enterprise not found"
      })
    })
});

router.get('/enterprise/:enterprise_id', function(req, res, next){
  var enterprise_id = req.params.enterprise_id;

  if(req.header('BrowserEnterprise') == null || req.header('BrowserEnterprise') != enterprise_id){
    return res.json({
      error: "401",
      message: "You lack of proper privileges to access this resource on SHMI"
    })
  }

  axios.get(config.nifiUrl+"/enterprise/"+req.params.enterprise_id, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

// router.get('/enterprise_types', function(req, res, next){
//   axios.get(config.nifiUrl+"/enterprise_types", {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/sites', function(req, res, next){
//   axios.get(config.nifiUrl+"/sites", {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

router.get('/site/:site_id', function(req, res, next){
  var site_id = req.params.site_id;

  if(req.header('BrowserSite') == null || req.header('BrowserSite') != site_id){
    return res.json({
      error: "401",
      message: "You lack of proper privileges to access this resource on SHMI"
    })
  }

  axios.get(config.nifiUrl+"/site/"+ site_id, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});


// router.get('/site_types', function(req, res, next){
//   axios.get(config.nifiUrl+"/site_types", {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/segments', function(req, res, next){
//   axios.get(config.nifiUrl+"/segments", {
//      crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

router.get('/segment/:site_id([0-9A-Z]+)/:segment_id([0-9]+)', function(req, res, next){
  var site_id = req.params.site_id;
  var segment_id = req.params.segment_id;

  var segment_path = site_id +"/"+ segment_id;
  
  if(req.header('BrowserSite') == null || req.header('BrowserSite') != site_id){
    return res.json({
      error: "401",
      message: "You lack of proper privileges to access this resource on SHMI"
    })
  }

  axios.get(config.nifiUrl+"/segment/"+segment_path, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

// router.get('/segment_types', function(req, res, next){
//   axios.get(config.nifiUrl+"/segment_types", {
//      crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/segment_type/:sg_db_site([0-9A-Z]+)/:sg_db_id([0-9]+)/:sg_type_code([0-9]+)', function(req, res, next){
//   var sg_db_site = req.params.sg_db_site;
//   var sg_db_id = req.params.sg_db_id;
//   var sg_type_code = req.params.sg_type_code;

//   var segment_type_id = sg_db_site +"/"+ sg_db_id + "/" + sg_type_code;

//   axios.get(config.nifiUrl+"/segment_type/"+segment_type_id, {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/assets', function(req, res, next){
//   axios.get(config.nifiUrl+"/assets", {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

router.get('/asset/:site_id([0-9A-Z]+)/:asset_id([0-9]+)', function(req, res, next){
  var site_id = req.params.site_id;
  var asset_id = req.params.asset_id;

  var asset_path = site_id +"/"+ asset_id;

  if(req.header('BrowserSite') == null || req.header('BrowserSite') != site_id){
    return res.json({
      error: "401",
      message: "You lack of proper privileges to access this resource on SHMI"
    })
  }

  axios.get(config.nifiUrl+"/asset/"+asset_path, {
      crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});

// router.get('/asset_types', function(req, res, next){
//   axios.get(config.nifiUrl+"/asset_types", {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/asset_type/:as_db_site([0-9A-Z]+)/:as_db_id([0-9]+)/:as_type_code([0-9]+)', function(req, res, next){
//   var as_db_site = req.params.as_db_site;
//   var as_db_id = req.params.as_db_id;
//   var as_type_code = req.params.as_type_code;

//   var asset_type_id = as_db_site +"/"+ as_db_id + "/" + as_type_code;

//   axios.get(config.nifiUrl+"/asset_type/"+asset_type_id, {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/sg_as_event_types', function(req, res, next){
//   axios.get(config.nifiUrl+"/sg_as_event_types", {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/sg_as_event_type/:ev_db_site([0-9A-Z]+)/:ev_db_id([0-9]+)/:ev_type_code([0-9]+)', function(req, res, next){
//   var ev_db_site = req.params.ev_db_site;
//   var ev_db_id = req.params.ev_db_id;
//   var ev_type_code = req.params.ev_type_code;

//   var sg_as_event_type_id = ev_db_site +"/"+ ev_db_id + "/" + ev_type_code;

//   axios.get(config.nifiUrl+"/sg_as_event_type/"+sg_as_event_type_id, {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/meas_loc_types', function(req, res, next){
//   axios.get(config.nifiUrl+"/meas_loc_types", {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/meas_loc_type/:ml_db_site([0-9A-Z]+)/:ml_db_id([0-9]+)/:ml_type_code([0-9]+)', function(req, res, next){
//   var ml_db_site = req.params.ml_db_site;
//   var ml_db_id = req.params.ml_db_id;
//   var ml_type_code = req.params.ml_type_code;

//   var meas_loc_type_id = ml_db_site +"/"+ ml_db_id + "/" + ml_type_code;

//   axios.get(config.nifiUrl+"/meas_loc_type/"+meas_loc_type_id, {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/eng_unit_types', function(req, res, next){
//   axios.get(config.nifiUrl+"/eng_unit_types", {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/eng_unit_type/:eu_db_site([0-9A-Z]+)/:eu_db_id([0-9]+)/:eu_type_code([0-9]+)', function(req, res, next){
//   var eu_db_site = req.params.eu_db_site;
//   var eu_db_id = req.params.eu_db_id;
//   var eu_type_code = req.params.eu_type_code;

//   var eng_unit_type_id = eu_db_site +"/"+ eu_db_id + "/" + eu_type_code;

//   axios.get(config.nifiUrl+"/eng_unit_type/"+eng_unit_type_id, {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/mloc_calc_types', function(req, res, next){
//   axios.get(config.nifiUrl+"/mloc_calc_types", {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

// router.get('/mloc_calc_type/:mc_db_site([0-9A-Z]+)/:mc_db_id([0-9]+)/:mc_type_code([0-9]+)', function(req, res, next){
//   var mc_db_site = req.params.mc_db_site;
//   var mc_db_id = req.params.mc_db_id;
//   var mc_type_code = req.params.mc_type_code;

//   var mloc_calc_type_id = mc_db_site +"/"+ mc_db_id + "/" + mc_type_code;

//   axios.get(config.nifiUrl+"/mloc_calc_type/"+mloc_calc_type_id, {
//       crossdomain:true
//     })
//     .then(response => {
//       return res.json(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// });

router.get('/meas_location/:meas_loc_site([0-9A-Z]+)/:meas_loc_id([0-9]+)', function(req, res, next){
  var meas_loc_site = req.params.meas_loc_site;
  var meas_loc_id = req.params.meas_loc_id;

  var meas_event_latest = req.query.meas_event_latest;
  var meas_event_full = req.query.meas_event_full;

  var meas_loc_path = meas_loc_site +"/"+ meas_loc_id;

  if(req.header('BrowserSite') == null || req.header('BrowserSite') != meas_loc_site){
    return res.json({
      error: "401",
      message: "You lack of proper privileges to access this resource on SHMI"
    })
  }

  //http://serena:9093/serena/1.0/meas_location/0000006400000065/118?meas_event_latest=2&meas_event_full=true
  axios.get(config.metadataServiceUrl+"/meas_location/"+meas_loc_path+"?meas_event_latest="+meas_event_latest+"&meas_event_full="+meas_event_full, {
    crossdomain:true
    })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    })
});


router.get('/meas_locations', function(req, res, next){
  var meas_loc_site = req.query.meas_loc_site;
  var mloc_calc_type = req.query.mloc_calc_type;

  if(req.header('BrowserSite') == null || req.header('BrowserSite') != meas_loc_site){
    return res.json({
      error: "401",
      message: "You lack of proper privileges to access this resource on SHMI"
    })
  }

  //http://serena:9009/serena/1.0/meas_locations?meas_loc_site=0000012C0000012D&mloc_calc_type=0000000000000000/6/11 
  axios.get(config.metadataServiceUrl+"/meas_locations?meas_loc_site="+meas_loc_site+"&mloc_calc_type="+mloc_calc_type, {
  crossdomain:true
  })
  .then(response => {
    return res.json(response.data);
  })
  .catch(error => {
    console.log(error);
  })
});

router.get('/last_meas_event/:meas_loc_site([0-9A-Z]+)/:meas_loc_id([0-9]+)', function(req, res, next){
  var meas_loc_site = req.params.meas_loc_site;
  var meas_loc_id = req.params.meas_loc_id;

  var meas_loc_path = meas_loc_site +"/"+ meas_loc_id;

  if(req.header('BrowserSite') == null || req.header('BrowserSite') != meas_loc_site){
    return res.json({
      error: "401",
      message: "You lack of proper privileges to access this resource on SHMI"
    })
  }

  //http://serena:9093/last_meas_event/0000006400000065/118
  axios.get(config.nifiUrl_ws+"/last_meas_event/"+meas_loc_path, {
    crossdomain:true
    })
    .then(response => {
      return res.json(response.data.meas_events[0]);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/digest_prediction/:site_id([0-9A-Z]+)/:segment_id([0-9]+)', function(req, res, next){
  var site_id = req.params.site_id;
  var segment_id = req.params.segment_id;

  var prediction_path = site_id +"/"+ segment_id;

  if(req.header('BrowserSite') == null || req.header('BrowserSite') != site_id){
    return res.json({
      error: "401",
      message: "You lack of proper privileges to access this resource on SHMI"
    })
  }

  axios.get(config.nifiUrl_old+"/digest_prediction?id="+prediction_path, {
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