module.exports = {
  stage: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'production' ? process.env.PORT :  4444,
  nifiUrl: process.env.NODE_ENV === 'production' 
    ? "http://"+process.env.NIFI_HOST+":"+process.env.NIFI_PORT 
    : "http://serena:9093",
  nifiUrl_old: process.env.NODE_ENV === 'production' 
    ? "http://"+process.env.NIFI_HOST+":"+process.env.NIFI_PORT_OLD 
    : "http://serena:9012"
};