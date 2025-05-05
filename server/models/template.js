const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  templateName: {
    type: String,
    required: true,
  },
  offerName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
