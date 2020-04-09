module.exports = {
    stage: process.env.NODE_ENV,
    port: process.env.NODE_ENV === 'production' ? process.env.PORT :  8081,
    mdInterfaceUrl:  process.env.NODE_ENV === 'production' ? process.env.MD_INTERFACE_URL : "http://localhost:9090/api/metadata"
  };