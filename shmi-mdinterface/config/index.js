module.exports = {
<<<<<<< HEAD
  nifiUrl: process.env.NODE_ENV === 'production' ? "http://serena:9009" : "http://localhost:9081",
  myenvvar: process.env.NODE_ENV === 'production' ? process.env.MYENV : 'myenv'
=======
  stage: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'production' ? process.env.PORT :  4444,
  nifiUrl: process.env.NODE_ENV === 'production' ? process.env.NIFI_URL : "http://serena:9093"
>>>>>>> f607ef6bd22e1dc725db9668a89cc71b883dbddd
};