const express = require('express');
const Team = require('../models/Team');


const teamRouter = express.Router();

teamRouter.get('/', (req, res) => {
    Team.find((err, teams) => {
            if (err) {
                console.log(err);
            } else {
                res.json(teams);
            }
        })
        .populate('players')
        .populate('coaches')
});

teamRouter.get('/:id', (req, res) => {
    Team.findById(req.params.id, (err, team) => {
        if (err) {
            console.log(err);
        } else {
            res.json(team);
        }
    })
    .populate('players')
    .populate('coaches')
});

module.exports = teamRouter;