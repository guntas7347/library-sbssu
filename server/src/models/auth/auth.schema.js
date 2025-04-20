const { Schema, model, models } = require("mongoose");

const AuthSchema = Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "STAFF" },
  rights: { type: [String], default: [""] },
  createdAt: { type: Date, default: new Date() },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  resetCode: { type: String },
  resetCodeTime: { type: Date },
  active: { type: Boolean, default: true },
});

const Auth = models.Auth || model("Auth", AuthSchema);

module.exports = Auth;
