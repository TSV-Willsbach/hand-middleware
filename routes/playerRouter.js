import express from 'express';
import Player from '../models/Player';

const playerRouter = express.Router();

playerRouter.route('/').get((req, res) => {
    Player.find((err, players) => {
        if (err) {
            console.log(err);
        } else {
            res.json(players);
        }
    })
});

playerRouter.route('/:id').get((req, res) => {
    Player.findById(req.params.id, (err, player) => {
        if (err) {
            console.log(err);
        } else {
            res.json(player);
        }
    })
});

playerRouter.route('/add').post((req, res) => {
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

playerRouter.route('/update/:id').post((req, res) => {
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

playerRouter.route('/delete/:id').get((req, res) => {
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

export default playerRouter;