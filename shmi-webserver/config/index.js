module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
    session_secret: process.env.NODE_ENV === 'production' ? process.env.SECRET_SESSION : 'secret',
    mongoURI: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI :  "mongodb://127.0.0.1:27017/shmi"
  };