module.exports = {
  stage: process.env.NODE_ENV,
  localMetadataApiUrl:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_WEB_SERVER_PROTOCOL +
        "://" +
        process.env.VUE_APP_WEB_SERVER_HOST +
        ":" +
        process.env.VUE_APP_WEB_SERVER_PORT +
        "/api/metadata/api/1.0"
      : "http://localhost:9090/api/metadata/api/1.0",
  serenaDigestPredictionUrl:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_WEB_SERVER_PROTOCOL +
        "://" +
        process.env.VUE_APP_WEB_SERVER_HOST +
        ":" +
        process.env.VUE_APP_WEB_SERVER_PORT +
        "/api/metadata/api/1.0/digest_prediction"
      : "http://localhost:9090/api/metadata/api/1.0/digest_prediction",
  serenaPredictionUrl:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_WEB_SERVER_PROTOCOL +
        "://" +
        process.env.VUE_APP_WEB_SERVER_HOST +
        ":" +
        process.env.VUE_APP_WEB_SERVER_PORT +
        "/api/metadata/api/1.0/meas_location"
      : "http://localhost:9090/api/metadata/api/1.0/meas_location",
  serenaLabelMlocCalcTypeId: "0000000000000000/6/10",
  serenaRulMlocCalcTypeId: "0000000000000000/6/11",
};