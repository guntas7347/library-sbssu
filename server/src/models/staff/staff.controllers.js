const Staff = require("./staff.schema");

const createNewStaff = async (staffDetails, session) => {
  return await Staff.create([staffDetails], { session });
};

const getStaff = async (filter) => {
  return await Staff.find(filter).populate({
    path: "authId",
    select: "level active",
  });
};

const getStaffs = async () => {
  return await Staff.find()
    .populate({ path: "authId", select: "rights" })
    .lean();
};

const updateStaffById = async (_id, update, session) => {
  return await Staff.findByIdAndUpdate(_id, update, { session });
};

module.exports = { createNewStaff, getStaff, getStaffs, updateStaffById };
