import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

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