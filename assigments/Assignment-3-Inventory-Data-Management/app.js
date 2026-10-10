require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inventory and Data Management System API',
  });
});

app.use('/api/products', productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = { app, connectDB };
