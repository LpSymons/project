import express from 'express';
import data from './data.js';

const app = express();

//return list of product from backend
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

//Listner on the port to detect changes and auto update with nodemon server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
