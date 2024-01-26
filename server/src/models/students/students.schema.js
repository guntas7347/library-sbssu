const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema({
  rollNumber: {
    type: Number,
    required: true,
  },
  fullName: {
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
  libraryCards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LibraryCard",
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Student", StudentsSchema, "Students");
