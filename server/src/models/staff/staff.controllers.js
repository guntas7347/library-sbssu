const staffSchema = require("./staff.schema");

const createNewStaff = async (staffDetails) => {
  return await staffSchema.create(staffDetails);
};

const fetchAllStaff = async () => {
  return await staffSchema.find().select("idNumber fullName role");
};

const fetchStaffById = async (_id) => {
  return await staffSchema.findById(_id);
};

module.exports = { createNewStaff, fetchAllStaff, fetchStaffById };
