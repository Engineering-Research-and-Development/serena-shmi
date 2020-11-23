module.exports = {
  stage: process.env.NODE_ENV,
  localMetadataApiUrl:
    //process.env.NODE_ENV === "production"
    //  ?
    //    process.env.VUE_APP_SHMI_WEB_SERVER_URL
    //    +
    //    "/api/metadata/api/1.0"
    //  :
    //    "http://localhost:9090/api/metadata/api/1.0",
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_SHMI_WEB_SERVER_URL + "/api/metadata/api/1.0"
      : //"http://localhost:9090/api/metadata/api/1.0"
        "https://shmi.serenademo.eu/api/metadata/api/1.0",
  serenaPredictionUrl:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_SHMI_WEB_SERVER_URL +
        "/api/metadata/api/1.0/meas_location"
      : //"http://localhost:9090/api/metadata/api/1.0/meas_location"
        "https://shmi.serenademo.eu/api/metadata/api/1.0/meas_location",
  visualization_links:
    process.env.NODE_ENV === "production"
      ? {
          "Punching Tool":
            process.env.VUE_APP_SYN_WEB_SERVER_URL +
            "/syn-vis/pages/use-case/kone/visualization/combi/index.html",

          RobotBox:
            process.env.VUE_APP_SYN_WEB_SERVER_URL +
            "/syn-vis/pages/use-case/comau/visualization/robotbox/index.html",
        }
      : {
          "Punching Tool":
            "https://visualization.serenademo.eu/syn-vis/pages/use-case/kone/visualization/combi/index.html",
          RobotBox:
            "https://visualization.serenademo.eu/syn-vis/pages/use-case/comau/visualization/robotbox/index.html",
        },
  training_links:
    process.env.NODE_ENV === "production"
      ? {
          "Punching Tool":
            process.env.VUE_APP_SYN_WEB_SERVER_URL +
            "/syn-vis/pages/use-case/kone/maintenance/combi/index.html",

          RobotBox:
            process.env.VUE_APP_SYN_WEB_SERVER_URL +
            "/syn-vis/pages/use-case/comau/maintenance/belt/index.html",
        }
      : {
          "Punching Tool":
            "https://visualization.serenademo.eu/syn-vis/pages/use-case/kone/maintenance/combi/index.html",
          RobotBox:
            "https://visualization.serenademo.eu/syn-vis/pages/use-case/comau/maintenance/belt/index.html",
        },
  metadataManager:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_SYN_WEB_SERVER_URL + "/syn-vis/pages/md-manager/"
      : "https://visualization.serenademo.eu/syn-vis/pages/md-manager/",
  gatewayManager:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_SYN_WEB_SERVER_URL + "/syn-vis/pages/gw-manager/"
      : "https://visualization.serenademo.eu/syn-vis/pages/gw-manager/",
  politoCharts:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_SYN_WEB_SERVER_URL +
        "/syn-vis/pages/charts/silhouette/"
      : "https://visualization.serenademo.eu/syn-vis/pages/charts/silhouette/",
  rpcaManager:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_RPCA_MANAGER_URL
      : "#",
  lmsScheduler:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_LMS_SCHEDULER_URL
      : "#",
  hadoopMonitor:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_HADOOP_MONITOR_URL
      : "#",
  hueService:
    process.env.NODE_ENV === "production" ? process.env.VUE_APP_HUE_URL : "#",
  nifiService:
    process.env.NODE_ENV === "production" ? process.env.VUE_APP_NIFI_URL : "#",
  serenaLabelMlocCalcTypeId: "0000000000000000/6/10",
  serenaRulMlocCalcTypeId: "0000000000000000/6/11",
};
