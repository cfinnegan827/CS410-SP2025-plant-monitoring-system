import mongoose from "mongoose";


const environmentSchema = new mongoose.Schema({
    environment_name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    environment_conditions: {
        min_humidity_lvl: Number,
        max_humidity_lvl: Number,
        min_temp: Number,
        max_temp: Number,
        min_moisture: Number,
        max_moisture: Number,
    },
    plant_species: {
        type: String,
        default: ""
    },
    plant_quantity: {
        type: Number,
        default: 0
    }
}, {timestamps: true});


const environmentModel = mongoose.model("environments", environmentSchema);
export default environmentModel;