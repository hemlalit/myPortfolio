const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
connectDB();

const allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(cors({ origin: 'http://localhost:5500' }));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use(errorHandler);

module.exports = app;

