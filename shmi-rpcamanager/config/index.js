module.exports = {
    nifiUrl:  process.env.NODE_ENV === 'production' ? "https://serena/nifi" : "http://localhost:9081"  ,
    myenvvar: process.env.NODE_ENV === 'production' ? process.env.MYENV : 'myenv'
  };