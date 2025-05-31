const { Schema, model, models } = require("mongoose");

const StaffSchema = new Schema({
  idNumber: { type: Number, required: true, unique: true },
  fullName: { type: String, required: true },
  authId: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
  },
  phoneNumber: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  gender: { type: String, required: false },
  address: { type: String, required: false },
  emergencyContact: { type: String, required: false },
  employeeId: { type: String, required: false },
  department: { type: String, required: false },
  designation: { type: String, required: false },
  joiningDate: { type: Date, required: false },
  employmentStatus: { type: String, required: false },
  imageUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Staff = models.Staff || model("Staff", StaffSchema);

module.exports = Staff;
