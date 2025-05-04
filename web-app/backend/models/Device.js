import mongoose from "mongoose";


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