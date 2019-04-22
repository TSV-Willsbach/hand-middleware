import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Player from './models/Player';
import Team from './models/Team';

const port = process.env.PORT || 4000;

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect('mongodb+srv://miguel:tYxtxrGvn9hyNSi@cluster0-pi16x.mongodb.net/wh?retryWrites=true');
mongoose.connect('mongodb://localhost:27017');
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

router.route('/players').get((req, res) => {
    Player.find((err, players) => {
        if (err) {
            console.log(err);
        } else {
            res.json(players);
        }
    })
});

router.route('/teams').get((req, res) => {
    Team.find((err, teams) => {
        if (err) {
            console.log(err);
        } else {
            res.json(teams);
        }
    })
});

router.route('/players/:id').get((req, res) => {
    Player.findById(req.params.id, (err, player) => {
        if (err) {
            console.log(err);
        } else {
            res.json(player);
        }
    })
});

router.route('/teams/:id').get((req, res) => {
    Team.findById(req.params.id, (err, team) => {
        if (err) {
            console.log(err);
        } else {
            res.json(team);
        }
    })
});

router.route('/players/add').post((req, res) => {
    let player = new Player(req.body);
    player.save()
        .then(player => {
            res.status(200).json({
                'player': 'Added successfully'
            });
        })
        .catch(err => {
            res.status(400).send('Failed to create a player');
        });
});

router.route('/players/update/:id').post((req, res) => {
    Player.findById(req.params.id, (err, player) => {
        if (!player) {
            return next(new Error('Could not load document'));
        } else {
            player.name = req.body.name;
            player.prename = req.body.prename;
            player.number = req.body.number;
            player.birthday = req.body.birthday;

            player.save().then(player => {
                    res.json('Update done');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                });
        }
    });
});

router.route('/players/delete/:id').get((req, res) => {
    Player.findByIdAndRemove({
        _id: req.params.id
    }, (err, player) => {
        if (err) {
            console.log(err);
        } else {
            res.json('Remove successfully');
        }
    });
});

app.use('/', router);

app.listen(port, () => console.log(`Express server running on port ${port}`));