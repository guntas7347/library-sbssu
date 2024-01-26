const { default: mongoose } = require("mongoose");

const StaffSchema = new mongoose.Schema({
  idNumber: {
    type: Number,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  emergencyContact: {
    type: String,
    required: false,
  },
  employeeId: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    required: false,
  },
  joiningDate: {
    type: Date,
    required: false,
  },
  employmentStatus: {
    type: String,
    required: false,
  },
  profilePictureURL: {
    type: String,
    required: false,
  },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Staff", StaffSchema, "Staff");
