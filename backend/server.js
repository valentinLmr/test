import express from "express";
import data from "./data.js";
import mongoose from 'mongoose'
import userRouter from "./model/routers/userRouter.js";
import productRouter from './model/routers/productRouter.js'

const app = express();
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  userCreateIndex: true,
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter)
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message})
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
