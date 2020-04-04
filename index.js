const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const users = ['rakib', 'john', 'john Do', 'susmita', 'sabana'];

// DataBase connection
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/products', (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
    
    collection.find().limit(10).toArray((err, documents) => {
      console.log('inserted...');
      if (err) {
        console.log(err);
      }
      else {
        res.send(documents);
      }
        
    })
    // perform actions on the collection object
    client.close();
  });
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const name = users[id];
    res.send({id, name});
})

// post 

app.post('/addProduct', (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  const product = req.body;
  client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
    
    collection.insertOne(product, (err, result) => {
      console.log('inserted...');
      if (err) {
        console.log(err);
      }
      else {
        res.send(result.ops[0]);
      }
        
    })
    // perform actions on the collection object
    client.close();
  });
   
})

const port = process.env.PORT || 4200;

app.listen(port, () => console.log('Listen to port 8800'));
