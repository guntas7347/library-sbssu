const mongoose = require("mongoose");

const MEMBER_SCHEMA = new mongoose.Schema({
  membershipId: { type: Number, required: true, unique: true },
  authId: { type: mongoose.Schema.Types.ObjectId, ref: "auth_member" },
  rollNumber: { type: Number },
  fullName: { type: String, required: true },
  fathersName: { type: String, required: true },
  imgUrl: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  program: { type: String, required: true },
  specialization: { type: String, required: true },
  batch: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  libraryCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "libraryCard" }],
  role: {
    type: String,
    default: "STUDENT UG",
    enum: [
      "STUDENT UG",
      "STUDENT PG",
      "TEACHER REGULAR",
      "TEACHER ADHOC",
      "NON TEACHING STAFF",
    ],
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("member", MEMBER_SCHEMA);
