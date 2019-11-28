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

export interface Games {
    saison: string,
    team: string
}

export interface playerStat {
    name: string,
    preName: string,
    games: number,
    penalties: number,
    penaltyGoals: number,
    penaltyQuota: number,
    yellowCard: number,
    twoMinutes: number,
    redCard: number,
    blueCard: number,
    goals: number,
    goalsPerGame: number
}

export const GamesSchema = new Schema({
    opponent: {
        type: String
    },
    saison: {
        type: String
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    playerStatistics: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        },
        games: {
            type: Number
        }
    }]
});