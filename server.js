import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import playerRouter from './routes/playerRouter';
import teamRouter from './routes/teamRouter';

const port = process.env.PORT || 4000;

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/persons');
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

app.use('/api/players', playerRouter);
app.use('/api/teams', teamRouter);

app.use('/', router);

app.listen(port, () => console.log(`Express server running on port ${port}`));