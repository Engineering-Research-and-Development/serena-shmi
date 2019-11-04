module.exports = {
    myenvvar: process.env.NODE_ENV === 'production' ? process.env.MYENV : 'myenv',
  };