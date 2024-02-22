const staffSchema = require("./staff.schema");

const createNewStaff = async (staffDetails) => {
  return await staffSchema.create(staffDetails);
};

const findStaff = async (select) => {
  return await staffSchema.find().select(select);
};

const getStaffById = async (_id) => {
  return await staffSchema.findById(_id);
};

module.exports = { createNewStaff, findStaff, getStaffById };
