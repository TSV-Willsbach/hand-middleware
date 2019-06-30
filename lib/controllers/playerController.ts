import * as mongoose from 'mongoose';
import { Player, PlayerSchema } from '../models/playerModel';
import { Request, Response } from 'express';
import { Route, Controller, Post, Get, Path, Tags, SuccessResponse, Body } from 'tsoa';

const Player = mongoose.model('Player', PlayerSchema);

@Route('/players')
@Tags('Players')
export class PlayerController extends Controller {

    @SuccessResponse('201', 'Player created')
    @Post('/')
    public async addNewPlayer(@Body() requstBody: Player): Promise<void> {
        // let newPlayer = new Player(req.body);

        // newPlayer.save((err, Player) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(Player);
        // });
    }

    @Get('/')
    public async getPlayers() {
        try {
            let players = await Player.find()
                .populate('team');

            return players;
        } catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }

    }

    @Get('/{id}')
    public async getSinglePlayer(@Path('id') ID: string) {
        try {
            let player = await Player.findById(ID)
                .populate('team');
            return player;

        } catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }
    }
}