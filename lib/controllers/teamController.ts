import { PlayerEncryption } from './../services/playerEncryption';
import { playerStat } from './../models/teamModel';
import { Controller, Route, Get, Tags, Query, Path } from 'tsoa';
import * as mongoose from 'mongoose';
import { TeamSchema, GamesSchema, Games } from '../models/teamModel';
import { teamService } from "../services/teamService";

const Team = mongoose.model('Team', TeamSchema);
const Games = mongoose.model('Games', GamesSchema);

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

            let encryption = new PlayerEncryption();
            teams.forEach(element => {
                element.players = encryption.encryptPersonalData(element.players);
                element.coaches = encryption.encryptPersonalData(element.players);
            });

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


    @Get('/{id}/games')
    public async getTeamGames(@Path('id') id: string, @Query() saison?: string) {
        try {
            let teamStats;
            if (saison === undefined) {
                teamStats = await Games.find({ team: id })
                    .populate('playerStatistics.player')
                    .populate('team');
            } else {
                teamStats = await Games.find({ team: id, saison: saison })
                    .populate('playerStatistics.player')
                    .populate('team');
            }

            return teamStats;
        } catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }
    }

    @Get('/{id}/statistic')
    public async getTeamStatistic(@Path('id') id: string, @Query() saison?: string): Promise<playerStat[]> {
        let games = this.getTeamGames(id, saison);

        return await new teamService().getStatistics(games);
    }
}