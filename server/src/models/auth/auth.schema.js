const mongoose = require("mongoose");

const Auth_Admin_Schema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "ADMIN" },
  createdAt: { type: Date, default: new Date() },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "staff",
    required: true,
  },
  resetPass: { type: Object },
  active: { type: Boolean, default: true },
});

const Auth_Student_Schema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  resetPass: { type: Object },
  active: { type: Boolean, default: true },
});

const Auth_Applicant_Schema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
  resetPass: { type: Object },
  active: { type: Boolean, default: true },
});

const Auth_Admin = mongoose.model(
  "auth_admin",
  Auth_Admin_Schema,
  "auth_admins"
);

const Auth_Student = mongoose.model(
  "auth_student",
  Auth_Student_Schema,
  "auth_students"
);
const Auth_Applicant = mongoose.model(
  "auth_applicant",
  Auth_Applicant_Schema,
  "auth_applicants"
);

module.exports = { Auth_Admin, Auth_Student, Auth_Applicant };
