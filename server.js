//import express from 'express';
//import cors from 'cors';
//import bodyParser from 'body-parser';
//import mongoose from 'mongoose';

//import playerRouter from './routes/playerRouter';
//import teamRouter from './routes/teamRouter';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const playerRouter = require('./routes/playerRouter');
const teamRouter = require('./routes/teamRouter');

const port = process.env.PORT || 4000;

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://default:zhDLnu7Y8RK3RzRr@cluster0-pi16x.mongodb.net/wh', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

app.use('/api/teams', teamRouter);
app.use('/api/players', playerRouter);

app.use('/', router);

app.listen(port, () => console.log(`Express server running on port ${port}`));