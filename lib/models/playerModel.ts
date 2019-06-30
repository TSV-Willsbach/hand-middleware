import * as mongoose from 'mongoose';

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
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});