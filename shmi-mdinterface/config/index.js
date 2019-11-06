module.exports = {
    nifiUrl:  process.env.NODE_ENV === 'production' ? "https://serena/nifi" : "http://localhost:8080/nifi"  ,
    myenvvar: process.env.NODE_ENV === 'production' ? process.env.MYENV : 'myenv'  
  };