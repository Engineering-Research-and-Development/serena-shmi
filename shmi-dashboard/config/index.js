module.exports = {
  stage: process.env.NODE_ENV,
  localMetadataApiUrl:
    process.env.NODE_ENV === "production"
      ? 
        process.env.VUE_APP_SHMI_WEB_SERVER_URL 
        +
        "/api/metadata/api/1.0"
      : 
        "http://localhost:9090/api/metadata/api/1.0"
  ,

  serenaPredictionUrl:
    process.env.NODE_ENV === "production"
      ? 
      process.env.VUE_APP_SHMI_WEB_SERVER_URL 
      +
        "/api/metadata/api/1.0/meas_location"
      : 
        "http://localhost:9090/api/metadata/api/1.0/meas_location"
  ,
  
  visualization_links: 
    process.env.NODE_ENV === "production" 
    ?
      {
        "Punching Tool":
          process.env.VUE_APP_SYN_WEB_SERVER_URL 
          +
          "/syn-vis/pages/use-case/kone/visualization/combi/index.html",

        "RobotBox":
          process.env.VUE_APP_SYN_WEB_SERVER_URL 
          +
          "/syn-vis/pages/use-case/comau/visualization/robotbox/index.html"
      }
    :
      {
        "Punching Tool":
          "http://serena:9008/syn-vis/pages/use-case/kone/visualization/combi/index.html",
        "RobotBox":
          "http://serena:9008/syn-vis/pages/use-case/comau/visualization/robotbox/index.html",
      }
  ,

  training_links: 
    process.env.NODE_ENV === "production" 
    ?
      {
        "Punching Tool":
          process.env.VUE_APP_SYN_WEB_SERVER_URL 
          +
          "/syn-vis/pages/use-case/kone/maintenance/combi/index.html",

        "RobotBox":
          process.env.VUE_APP_SYN_WEB_SERVER_URL 
          +
          "/syn-vis/pages/use-case/comau/maintenance/belt/index.html"
      }
    :
      {
        "Punching Tool":
          "http://serena:9008/syn-vis/pages/use-case/kone/maintenance/combi/index.html",
        "RobotBox":
          "http://serena:9008/syn-vis/pages/use-case/comau/maintenance/belt/index.html",
      }
  ,

  metadataManager: 
    process.env.NODE_ENV === "production" 
    ?
      process.env.VUE_APP_SYN_WEB_SERVER_URL 
      +
      "/syn-vis/pages/md-manager/"
    :
      "http://serena:9008/syn-vis/pages/md-manager/"
  ,

  gatewayManager: 
    process.env.NODE_ENV === "production" 
    ?
      process.env.VUE_APP_SYN_WEB_SERVER_URL 
      +
      "/syn-vis/pages/gw-manager/"
    :
      "http://serena:9008/syn-vis/pages/gw-manager/"
  ,

  politoCharts: 
    process.env.NODE_ENV === "production" 
    ?
      process.env.VUE_APP_SYN_WEB_SERVER_URL 
      +
      "/syn-vis/pages/charts/index.html"
    :
      "http://serena:9008/syn-vis/pages/charts/index.html"
,
        
rpcaManager: 
    process.env.NODE_ENV === "production" 
    ?
      process.env.VUE_APP_RPCA_MANAGER_URL
    :
      "#"
,

lmsScheduler: 
  process.env.NODE_ENV === "production" 
  ?
    process.env.VUE_APP_LMS_SCHEDULER_URL
  :
    "#"
,

serenaLabelMlocCalcTypeId: "0000000000000000/6/10",
serenaRulMlocCalcTypeId: "0000000000000000/6/11"

};
