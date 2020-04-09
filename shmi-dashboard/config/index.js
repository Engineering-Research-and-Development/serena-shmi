module.exports = {
  stage: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'production' ? process.env.PORT :  8080,
  localMetadataApiUrl:  process.env.NODE_ENV === 'production' ? process.env.MD_INTERFACE_URL: "http://localhost:9090/api/metadata/api/1.0",
  serenaDigestPredictionUrl: process.env.NODE_ENV === 'production' ? process.env.MD_INTERFACE_PREDICTION_URL : "http://localhost:9090/api/metadata/api/1.0/digest_prediction", 
  jsonPlaceholder: "https://jsonplaceholder.typicode.com"
};
