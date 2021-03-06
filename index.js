const express = require('express');
const path = require('path');
const app = express();
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties.ini');
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
var MongoClient = require('mongodb').MongoClient;
let db = []
let collection =[]
var url = properties.get('mongo.url');
console.log(url)
const dbName='heroku_vn8nrv9t'

MongoClient.connect(url, function(err, client) {
    console.log("Connected correctly to server");
    if (err){console.log(err);}
    db = client.db(dbName);
    collection = db.collection('test')
})

app.get('/api/users', (req, res) => {
  collection.find().toArray(function(err, docs) {
    res.json(docs)
  })
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
