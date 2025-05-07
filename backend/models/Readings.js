import mongoose from "mongoose";


const readingSchema = new mongoose.Schema({
    device_id: { 
      type: String, 
      ref: 'devices', 
      required: true 
    },
    environment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'environments',
      default: null
    },
    temp: Number,
    humidity: Number,
    timestamp: {
      type: Date,
      default: Date.now
    }
  });


const readingModel = mongoose.model("readings", readingSchema);
export default readingModel;