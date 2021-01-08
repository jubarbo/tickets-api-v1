// const express = require('express');
import express from 'express';
import ticketsRoutes from './routes/tickets.routes.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

//middlewares
const corsOptions = {};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my app' });
});

app.use('/api/tickets', ticketsRoutes);

export default app;
