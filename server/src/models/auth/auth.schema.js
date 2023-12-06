const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

module.exports = mongoose.model("Auth", AuthSchema, "Auths");
