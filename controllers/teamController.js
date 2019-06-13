const Team = require('../models/Team');

exports.getTeams = (req, res, next) => {
    Team.find((err, teams) => {
            if (err) {
                console.log(err);
            } else {
                res.json(teams);
            }
        })
        .populate('players')
        .populate('coaches')
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