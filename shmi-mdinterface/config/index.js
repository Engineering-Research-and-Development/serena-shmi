module.exports = {
  stage: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'production' ? process.env.MDIFPORT :  4444,
  nifiUrl: process.env.NODE_ENV === 'production' 
    ? "http://"+process.env.NIFI_HOST+":"+process.env.NIFI_PORT  + "/serena/1.0"
    : "http://serena:9009/serena/1.0",
  nifiUrl_ws: process.env.NODE_ENV === 'production' 
    ? "http://"+process.env.NIFI_HOST+":"+process.env.NIFI_PORT
    : "http://serena:9009"
};