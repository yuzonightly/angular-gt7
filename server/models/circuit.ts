import { model, Schema } from 'mongoose';

const CircuitSchema = new Schema({
    name: String,
    side: String,
    location: String,
    timezone: Number,
    grade: Number,
    length: Number,
});
 
const Circuit = model('Circuit', CircuitSchema);

export default Circuit;
