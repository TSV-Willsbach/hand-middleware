import express from 'express';
import Team from '../models/Team';

const teamRouter = express.Router();

teamRouter.route('/').get((req, res) => {
    Team.find((err, teams) => {
        if (err) {
            console.log(err);
        } else {
            res.json(teams);
        }
    })
});

teamRouter.route('/:id').get((req, res) => {
    Team.findById(req.params.id, (err, team) => {
        if (err) {
            console.log(err);
        } else {
            res.json(team);
        }
    })
});

export default teamRouter;