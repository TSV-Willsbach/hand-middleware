const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;
const user = process.env.userID || 'default:zhDLnu7Y8RK3RzRr';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://${user}@cluster0-pi16x.mongodb.net/wh`, {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});


app.get('/', router);
app.use('/api/teams', require('./routes/teamRouter'));
app.use('/api/players', require('./routes/playerRouter'));
app.use('/api/wp', require('./routes/wordPressRouter'));


app.listen(port, () => console.log(`Express server running on port ${port}`));