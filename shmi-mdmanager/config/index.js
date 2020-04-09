module.exports = {
    stage: process.env.NODE_ENV,
    port: process.env.NODE_ENV === 'production' ? process.env.PORT :  8081,
    mdInterfaceUrl:  process.env.NODE_ENV === 'production' 
      ? "http://"+process.env.WEB_SERVER_HOST+":"+process.env.WEB_SERVER_PORT+"/api/metadata" 
      : "http://localhost:9090/api/metadata"
  };