import { model, Schema } from 'mongoose';

const CarSchema = new Schema({
    manufacturer: String,
    model: String,
    class: String,
    year: Number,
    torque: Number,
    top_speed: Number,
});

const Car = model('Car', CarSchema);

export default Car;
