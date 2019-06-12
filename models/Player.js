// import mongoose from 'mongoose';
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
    }
});

module.exports = mongoose.model('Player', Player);