module.exports = {
    mdInterfaceUrl:  process.env.NODE_ENV === 'production' ? "https://serena/nifi" : "http://localhost:9090/api/metadata/"  ,
    myenvvar: process.env.NODE_ENV === 'production' ? process.env.MYENV : 'myenv'
  };