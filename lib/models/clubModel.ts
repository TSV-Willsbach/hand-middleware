import * as mongoose from 'mongoose';

export interface LastClub {
    _id: string;
    name: string;
    url: string;
}

const Schema = mongoose.Schema;

export const ClubSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a first name'
    },
    url: {
        type: String,

        required: 'Enter a last name'
    }
});