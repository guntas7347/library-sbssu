const mongoose = require("mongoose");

const ApplicationsSchema = new mongoose.Schema({
  applicationNumber: {
    type: Number,
    required: true,
  },
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
    type: Date,
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
    type: Number,
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
  createdAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Application",
  ApplicationsSchema,
  "Applications"
);
