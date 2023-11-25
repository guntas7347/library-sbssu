const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  rollNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fathersName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Student", studentsSchema, "Students");
