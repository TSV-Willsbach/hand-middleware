import * as mongoose from 'mongoose';
import { PlayerSchema } from '../models/playerModel';
import { Request, Response } from 'express';
import { Route, Controller, Post, Get, Path } from 'tsoa';

const Player = mongoose.model('Player', PlayerSchema);

@Route('/players')
export class PlayerController extends Controller {

    // @Post('/')
    // public async addNewPlayer(): Promise<void> {
    //     // let newPlayer = new Player(req.body);

    //     // newPlayer.save((err, Player) => {
    //     //     if (err) {
    //     //         res.send(err);
    //     //     }
    //     //     res.json(Player);
    //     // });
    // }

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

    // @Get('/{id}')
    // public async getSinglePlayer(@Path('id') ID: number) {
    //     return Player.findById(ID, (err, player) => {

    //     })
    //         .populate('team');
    // }
}