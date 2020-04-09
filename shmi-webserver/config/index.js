module.exports = {
  stage: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'production' ? process.env.PORT :  9090,
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  session_secret: process.env.NODE_ENV === 'production' ? process.env.SECRET_SESSION : 'secret',
  mongoUri: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI :  "mongodb://127.0.0.1:27017/shmi",

  metadataInterfaceUrl:  process.env.NODE_ENV === 'production' 
  ? "http://"+process.env.MD_INTERFACE_HOST+":"+process.env.MD_INTERFACE_PORT
  : "http://localhost:4444",
};