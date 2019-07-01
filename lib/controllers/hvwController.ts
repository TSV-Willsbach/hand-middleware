import { Route, Tags, Controller, Get, Query, Path } from "tsoa";
import { hvwService } from "../services/hvwService";

@Route('/hvw')
@Tags('HVW')
export class hvwController extends Controller {

    @Get('/games')
    public async getGames(@Query() periode?: number) {
        return await new hvwService().getGames(periode);
    }

    @Get('/games/{id}')
    public async getGame(@Path('id') ID: string) {
        return await new hvwService().getGame(ID);
    }

    @Get('/ligue')
    public async getLigue(@Query() id: string) {
        return await new hvwService().getLigue(id);
    }
}