import mongoose from "mongoose";


const environmentSchema = new mongoose.Schema({
    environment_name: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    current_temp: {
        type: Number,
        default: 0
    },
    current_humidity: {
        type: Number,
        default: 0
    },
    environment_conditions: {
        min_humidity_lvl: Number,
        max_humidity_lvl: Number,
        min_temp: Number,
        max_temp: Number
    },
    environment_inventory: {
        type: Map,
        of: new mongoose.Schema({
            plant_id: String,
            quantity: {
                type: Number,
                default: 1
            }
        }, {_id: false})
    },
    // will delete to replace to a seperate document
    // readings: [
    //     {
    //         temp: Number,
    //         humidity: Number,
    //         timestamp: {
    //             type: Date,
    //             default: Date.now
    //         }
    //     }
    // ],
    created_at: {
        type: Date,
        default: Date.now
    }
});


const environmentModel = mongoose.model("environments", environmentSchema);
export default environmentModel;