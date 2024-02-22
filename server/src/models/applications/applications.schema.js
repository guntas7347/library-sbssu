const mongoose = require("mongoose");

const ApplicationsSchema = new mongoose.Schema({
  rollNumber: { type: Number, required: true },
  fullName: { type: String, required: true },
  fathersName: { type: String, required: true },
  gender: { type: String, required: true },
  category: { type: String, required: true },
  dob: { type: Date, required: true },
  program: { type: String, required: true },
  specialization: { type: String, required: true },
  batch: { type: Number, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model(
  "application",
  ApplicationsSchema,
  "applications"
);
