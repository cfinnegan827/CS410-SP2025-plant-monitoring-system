// Device,js - Mongoose model for registered devices 
import mongoose from "mongoose";

/*
@desc ties a device to an environment so environments can use routes to get data for the appropiate device
*/
const deviceSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    device_id: { 
      type: String, 
      unique: true, 
      required: true 
    },
    environment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'environments',
      default: null
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  });


const deviceModel = mongoose.model("devices", deviceSchema);
export default deviceModel;
