import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Team = new Schema({
    name: {
        type: String
    }
});

export default mongoose.model('Team', Team);