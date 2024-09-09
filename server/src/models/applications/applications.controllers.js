const applicationsMongo = require("./applications.schema");

const createApplication = async (applicantDetails, session) => {
  return await applicationsMongo.create([applicantDetails], { session });
};

const getApplicationById = async (id) => {
  return await applicationsMongo.findById(id);
};

const findApplications = async (filter) => {
  const { sortSelect, sortValue } = filter;
  const query = applicationsMongo.find();
  switch (sortSelect) {
    case "rollNumber":
      query.where({ rollNumber: sortValue });
      break;
    default:
      break;
  }
  return await query.exec();
};

const deleteApplicationById = async (_id, session) => {
  return await applicationsMongo.findByIdAndDelete(_id, { session });
};

const updateApplication = async (id, update, session) => {
  return await applicationsMongo.findByIdAndUpdate(id, update).session(session);
};

module.exports = {
  createApplication,
  getApplicationById,
  findApplications,
  deleteApplicationById,
  updateApplication,
};
