import mongoose from "mongoose";

const sequenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
});

const Sequence = mongoose.model("Sequence", sequenceSchema);

export default Sequence;
