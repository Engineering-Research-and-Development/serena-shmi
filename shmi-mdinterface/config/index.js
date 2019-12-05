module.exports = {
    nifiUrl:  process.env.NODE_ENV === 'production' ? "http://serena:9093" : "http://localhost:9081"  ,
    myenvvar: process.env.NODE_ENV === 'production' ? process.env.MYENV : 'myenv'  
  };