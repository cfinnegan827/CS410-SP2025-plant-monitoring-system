import mongoose from "mongoose";


const readingSchema = new mongoose.Schema({
    environment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'environments',
      default: null
    },
    device_hash: {
      type: String,
      required: true
    },
    current_temp: {
      type: Number,
      default: 0
    },
    current_humidity: {
      type: Number,
      default: 0
    },
    current_moisture: {
      type: Number,
      default: 0
    },
    current_light: {
      type: Number,
      default: 0
    },
  }, {timestamps: true});


const readingModel = mongoose.model("readings", readingSchema);
export default readingModel;