import mongoose from 'mongoose';
import Player from './Player';

const Schema = mongoose.Schema;

let Team = new Schema({
    name: {
        type: String
    },
    players: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    coaches: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }

});

export default mongoose.model('Team', Team);