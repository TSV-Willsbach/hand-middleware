import * as mongoose from 'mongoose';
import { Team } from './teamModel';
import { LastClub } from './clubModel';

export interface Player {
    _id: string;
    prename: string;
    name: string;
    number: number;
    birthday?: string;
    coach?: Array<string>;
    team?: Array<string>;
}

const Schema = mongoose.Schema;

export const PlayerSchema = new Schema({
    prename: {
        type: String,
        required: 'Enter a first name'
    },
    name: {
        type: String,
        required: 'Enter a last name'
    },
    number: {
        type: Number
    },
    birthday: {
        type: Date
    },
    picture: {
        type: String
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    lastClubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clubs'

    }],
    socialMedia: {
        type: Object
    },
    dsgvo: {
        type: Boolean
    }
});