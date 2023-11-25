const mongoose = require("mongoose");

const programsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Program", programsSchema, "Programs");
