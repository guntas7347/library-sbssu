const mongoose = require("mongoose");

const AUTH_ADMIN_SCHEMA = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "STAFF" },
  level: { type: Number, default: 1 },
  createdAt: { type: Date, default: new Date() },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "staff",
    required: true,
  },
  resetCode: { type: String },
  resetCodeTime: { type: Date },
  active: { type: Boolean, default: true },
});

const AUTH_MEMBER_SCHEMA = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
    required: true,
  },
  resetCode: { type: String },
  resetCodeTime: { type: Date },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: new Date() },
});

const AUTH_APPLICANT_SCHEMA = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  resetCode: { type: String },
  resetCodeTime: { type: Date },
  active: { type: Boolean, default: true },
});

const AUTH_ADMIN = mongoose.model(
  "auth_admin",
  AUTH_ADMIN_SCHEMA,
  "auth_admins"
);

const AUTH_MEMBER = mongoose.model(
  "auth_member",
  AUTH_MEMBER_SCHEMA,
  "auth_members"
);
const AUTH_APPLICANT = mongoose.model(
  "auth_applicant",
  AUTH_APPLICANT_SCHEMA,
  "auth_applicants"
);

module.exports = { AUTH_ADMIN, AUTH_MEMBER, AUTH_APPLICANT };
