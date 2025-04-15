import mongoose from "mongoose";


const readingSchema = new mongoose.Schema({
    environment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'environments',
      required: true
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