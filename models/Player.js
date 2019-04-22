import mongoose from 'mongoose';

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

export default mongoose.model('Player', Player);