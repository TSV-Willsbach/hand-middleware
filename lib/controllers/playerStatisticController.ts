import { playerStatisticService } from "../services/statistiken/playerStatisticService";
import { Route, Tags, Controller, Get, Query, Path, Response } from "tsoa";

@Route('/playerStatistics')
@Tags('Handballstatistiken')
export class playerStatisticController extends Controller {

    @Get('/league')
    public async getLeaguePlayerStatistic(
        @Query('season') season: string = '2122', 
        @Query('league') league: string = 'Bezirksliga',
        @Query('gender') gender: string = 'Herren'): Promise<any[]> {
        return await new playerStatisticService(season, league, gender).getStatistics();
    }

    @Get('/player')
    public async getPlayerStatistic(
        @Query('season') season: string = '2122', 
        @Query('league') league: string = 'Bezirksliga',
        @Query('gender') gender: string = 'Herren',
        @Query('playerName') playerName): Promise<any[]>{
        return await new playerStatisticService(season, league, gender).getPlayerStatistics(playerName);
    }

    @Get('/team')
    public async getTeamStatistic(
        @Query('season') season: string = '2122', 
        @Query('league') league: string = 'Bezirksliga',
        @Query('gender') gender: string = 'Herren',
        @Query('teamName') teamName: string = 'TSV Willsbach'): Promise<any[]> {
        return await new playerStatisticService(season, league, gender).getTeamStatistics(teamName);
    }
} 