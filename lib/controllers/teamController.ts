import * as mongoose from 'mongoose';
import { TeamSchema } from '../models/teamModel';
import { Request, Response } from 'express';

const Team = mongoose.model('Team', TeamSchema);

export class TeamController {

    public addNewTeam(req: Request, res: Response) {
        let newTeam = new Team(req.body);

        newTeam.save((err, team) => {
            if (err) {
                res.send(err);
            }
            res.json(team);
        });
    }

    public getTeams(req: Request, res: Response) {
        Team.find({}, (err, team) => {
            if (err) {
                res.send(err);
            }
            res.json(team);
        })
            .populate('players')
            .populate('coaches');
    }

    public getSingleTeam(req: Request, res: Response) {
        Team.findById(req.params.teamId, (err, team) => {
            if (err) {
                res.send(err);
            }
            res.json(team);
        })
            .populate('players')
            .populate('coaches');
    }
}