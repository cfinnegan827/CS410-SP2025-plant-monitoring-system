import mongoose from "mongoose";


const readingSchema = new mongoose.Schema({
    email: String,
    light: Number,
    temperature: Number,
    soilMoisture: Number,
    humidity: Number,
    timestamp: {
      type: Date,
      default: Date.now
    }
  });


const readingModel = mongoose.model("plants", readingSchema);
export default readingModel;