module.exports = {
  stage: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'production' ? process.env.PORT :  8080,
  localMetadataApiUrl:  process.env.NODE_ENV === 'production' 
    ? "http://"+process.env.WEB_SERVER_HOST+":"+process.env.WEB_SERVER_PORT+"/api/metadata/api/1.0"
    : "http://localhost:9090/api/metadata/api/1.0",
  serenaDigestPredictionUrl: process.env.NODE_ENV === 'production' 
    ? "http://"+process.env.WEB_SERVER_HOST+":"+process.env.WEB_SERVER_PORT+"/api/metadata/api/1.0/digest_prediction"
    : "http://localhost:9090/api/metadata/api/1.0/digest_prediction", 
  jsonPlaceholder: "https://jsonplaceholder.typicode.com"
};
