import 'express';
const mongoose = require('mogoose');

const SensorDataSchema = new mongoose.Schema({
	time: {type: Time, default: Time.now},
	temperature: Number, 
	Humidity: Number,
	Soil_Moisture, Number,
	Light_Intensity, Number
	
});

module.export = mongoose.model('SensorData', SensorDataSchema)