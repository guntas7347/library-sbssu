const { Schema, model, models } = require("mongoose");

const MemberSchema = new Schema({
  membershipId: { type: Number, unique: true, sparse: true },
  applicationId: { type: Number, required: true, unique: true },
  authId: { type: Schema.Types.ObjectId, ref: "Auth" },
  rollNumber: { type: Number },
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  gender: {
    type: String,
    default: "MALE",
    enum: ["MALE", "FEMALE", "OTHER"],
  },
  dob: { type: Date, required: true },
  program: { type: String, required: true },
  specialization: { type: String, required: true },
  batch: { type: Number, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  libraryCards: [{ type: Schema.Types.ObjectId, ref: "LibraryCard" }],
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
  status: {
    type: String,
    default: "APPLIED",
    enum: ["APPLIED", "REJECTED", "CANCELLED", "ACTIVE", "INACTIVE"],
  },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Member = models.Member || model("Member", MemberSchema);

module.exports = Member;
