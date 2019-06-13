const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Player = new Schema({
    name: {
        type: String
    },
    prename: {
        type: String
    },
    number: {
        type: Number
    },
    birthday: {
        type: Date
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        autopopulate: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        autopopulate: true
    }
});

Player.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Player', Player);