// Plants.js - Mongoose model for registered devices 
import mongoose from "mongoose";

/*
@desc schema is used for the actual readings in the demo 
was the fasted way to get everything working
will get the data from esp and an email to make a call that will send it to the dashboard
*/

const plantSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  light: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  soilMoisture: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Plants', plantSchema);
