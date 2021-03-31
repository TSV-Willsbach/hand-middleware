import * as mongoose from 'mongoose';
import { LastClub, ClubSchema } from '../models/clubModel';
import { Route, Controller, Get, Path, Tags } from 'tsoa';

const LastClub = mongoose.model('Clubs', ClubSchema);

@Route('/clubs')
@Tags('Clubs')
export class ClubController extends Controller {

    @Get('/')
    public async getClubs() {
        try {
            let clubs = await LastClub.find();

            return clubs;
        } catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }

    }

    @Get('/{id}')
    public async getSingleClub(@Path('id') ID: string) {
        try {
            let club = await LastClub.findById(ID);
            return club;

        } catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }
    }

}