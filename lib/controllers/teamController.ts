import { Controller, Route, Post, Get, Tags } from 'tsoa';
import * as mongoose from 'mongoose';
import { TeamSchema } from '../models/teamModel';
import { Request, Response } from 'express';

const Team = mongoose.model('Team', TeamSchema);

@Route('/teams')
@Tags('Teams')
export class TeamController extends Controller {

    // @Post('/')
    // public addNewTeam() {
    //     // let newTeam = new Team(req.body);

    //     // newTeam.save((err, team) => {
    //     //     if (err) {
    //     //         res.send(err);
    //     //     }
    //     //     res.json(team);
    //     // });
    // }

    @Get('/')
    public async getTeams() {
        try {
            let teams = await Team.find({})
                .populate('players')
                .populate('coaches');
            return teams;
        } catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }

    }

    @Get('/{id}')
    public async getSingleTeam(id: string) {
        try {
            let teams = await Team.findById(id)
                .populate('players')
                .populate('coaches');
            return teams;
        } catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }
    }
}