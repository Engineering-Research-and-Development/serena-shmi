module.exports = {
  stage: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'production' ? process.env.PORT :  4444,
  nifiUrl: process.env.NODE_ENV === 'production' ? process.env.NIFI_URL : "http://localhost:9081"
};