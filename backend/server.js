import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

//to pull the data from the .env file and store it.
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connectionn to DB Sucessfull ${port}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
//return list of product from backend
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// error handler for express set status to server error this will be returned to the user
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//Listner on the port to detect changes and auto update with nodemon server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Connected at http://localhost:${port}`);
});
