const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Team = new Schema({
    name: {
        type: String
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        autopopulate: false
    }],
    coaches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        autopopulate: false
    }]

});

Team.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Team', Team);