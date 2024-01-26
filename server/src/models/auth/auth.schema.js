const mongoose = require("mongoose");

const Auth_Admin_Schema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "ADMIN" },
  createdAt: { type: Date, required: true },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
});

const Auth_Student_Schema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "STUDENT" },
  createdAt: { type: Date, required: true },
});

const Auth_Applicant_Schema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: Number, required: true },
  role: { type: String, default: "APPLICANT" },
  createdAt: { type: Date, required: true },
});

const Auth_Admin = mongoose.model(
  "Auth_Admin",
  Auth_Admin_Schema,
  "Auth_Admin"
);

const Auth_Student = mongoose.model(
  "Auth_Student",
  Auth_Student_Schema,
  "Auth_Student"
);
const Auth_Applicant = mongoose.model(
  "Auth_Applicant",
  Auth_Applicant_Schema,
  "Auth_Applicant"
);

module.exports = { Auth_Admin, Auth_Student, Auth_Applicant };
