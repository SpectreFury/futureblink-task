import mongoose from "mongoose";

const sourceListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emails: [
    {
      type: String,
    },
  ],
});

const SourceList = mongoose.model("SourceList", sourceListSchema);

export default SourceList
