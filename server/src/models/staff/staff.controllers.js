const staffSchema = require("./staff.schema");

const createNewStaff = async (staffDetails, session) => {
  return await staffSchema.create([staffDetails], { session });
};

const getStaff = async (filter) => {
  return await staffSchema
    .find(filter)
    .populate({ path: "authId", select: "level active" });
};

const getStaffs = async () => {
  return await staffSchema
    .find()
    .populate({ path: "authId", select: "level" })
    .lean();
};

const updateStaffById = async (_id, update, session) => {
  return await staffSchema.findByIdAndUpdate(_id, update, { session });
};

module.exports = { createNewStaff, getStaff, getStaffs, updateStaffById };
