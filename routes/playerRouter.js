const express = require('express');
const Player = require('../models/Player');

const playerRouter = express.Router();

playerRouter.get('/', (req, res) => {
    Player.find((err, players) => {
        if (err) {
            console.log(err);
        } else {
            res.json(players);
        }
    })
});

playerRouter.get('/:id', (req, res) => {
    Player.findById(req.params.id, (err, player) => {
        if (err) {
            console.log(err);
        } else {
            res.json(player);
        }
    })
});

playerRouter.post('/add', (req, res) => {
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

playerRouter.post('/update/:id', (req, res) => {
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

playerRouter.get('/delete/:id', (req, res) => {
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

module.exports = playerRouter;