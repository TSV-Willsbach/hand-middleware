const Player = require('../models/Player');

exports.getPlayers = (req, res, next) => {
    Player.find((err, players) => {
        if (err) {
            console.log(err);
        } else {
            res.json(players);
        }
    })
}

exports.getPlayer = (req, res, next) => {
    Player.findById(req.params.id, (err, player) => {
        if (err) {
            console.log(err);
        } else {
            res.json(player);
        }
    })
}

exports.addPlayer = (req, res, next) => {
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
}

exports.updatePlayer = (req, res, next) => {
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
}

exports.deletePlayer = (req, res, next) => {
    Player.findByIdAndRemove({
        _id: req.params.id
    }, (err, player) => {
        if (err) {
            console.log(err);
        } else {
            res.json('Remove successfully');
        }
    });
}