import mongoose from "mongoose";


const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    environment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'environments',
      required: true
    },
    apiToken: {
      type: String,
      reguired: true,
      unique: true
    },
    owner: { // atatch a device to a user
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required: true 
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  });


const deviceModel = mongoose.model("devices", deviceSchema);
export default deviceModel;