import mongoose from 'mongoose';
mongoose.Promise = Promise;

let personSchema = mongoose.Schema({
    name: String
});
const Person = mongoose.model('kash_db', personSchema, 'kash_db');

export default Person;