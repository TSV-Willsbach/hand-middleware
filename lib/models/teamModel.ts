import * as mongoose from 'mongoose';
import { Player } from './playerModel';

const Schema = mongoose.Schema;

export interface Team {
    _id: string;
    name: string;
    players: Array<Player>;
}

export const TeamSchema = new Schema({
    name: {
        type: String
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    coaches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }]
});