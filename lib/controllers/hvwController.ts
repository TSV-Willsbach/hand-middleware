import { Route, Tags, Controller, Get, Query, Path, Response } from "tsoa";
import { hvwService } from "../services/hvwService";
import { Game, Ligue, Club } from '../models/hvwModel';

@Route('/hvw')
@Tags('HVW')
export class hvwController extends Controller {

    @Get('/club')
    public async getClubs(): Promise<Club[]> {
        return await new hvwService().getClubs();
    }

    @Get('/club/{id}')
    public async getClub(@Path('id') id: string): Promise<Club> {
        return await new hvwService().getClub(id);
    }

    @Response('400', 'Bad request')
    @Get('/games')
    public async getGames(@Query('id') id: string): Promise<Game[]> {
        return await new hvwService().getGames(id);
    }

    @Get('/ligue')
    public async getLigue(@Query() id: string): Promise<Ligue> {
        return await new hvwService().getLigue(id);
    }
}