module.exports = {
    nifiUrl: process.env.NODE_ENV === 'production' ? "http://serena:9093" : "http://10.10.10.163:9081",
    myenvvar: process.env.NODE_ENV === 'production' ? process.env.MYENV : 'myenv',
    metadataUrl: process.env.NODE_ENV === 'production' ? "http://serena:9009/serena/1.0" : "http://10.10.10.163:9081/serena/1.0",
    localMetadataApiUrl: "http://localhost:9090/api/metadata/api/metadata/",
    jsonPlaceholder: "https://jsonplaceholder.typicode.com"
};