import express from 'express';
import data from './data.js';

const app = express();

//return list of product from backend
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
//Return product information based on the slug of the product
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
  res.send(data.products);
});
//Return product information based on the ID of each product
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
  res.send(data.product);
});

//Listner on the port to detect changes and auto update with nodemon server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
