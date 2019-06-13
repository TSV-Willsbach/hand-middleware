const Team = require('../models/Team');

exports.getTeams = (req, res, next) => {
    Team.find()
        .populate('players')
        .populate('coaches')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                teams: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        wpCat: doc.wpCat,
                        players: doc.players,
                        coaches: doc.coaches,
                        request: {
                            type: "GET",
                            url: "https://api.willsbach-handball.de/api/teams/" + doc._id
                        }
                    }
                })
            });
        })
}

exports.getTeam = (req, res, next) => {
    Team.findById(req.params.id, (err, team) => {
            if (err) {
                console.log(err);
            } else {
                res.json(team);
            }
        })
        .populate('players')
        .populate('coaches')
}