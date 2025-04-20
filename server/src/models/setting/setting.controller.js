const { createLog } = require("../../utils/functions");
const Setting = require("./setting.schema");

const createSettings = async (req) => {
  try {
    await Setting.create(req);
  } catch (error) {
    createLog(error);
  }
}; //disable in production

const fetchSettings = async (key) => {
  return await Setting.findOne({ key }).lean();
};

module.exports = { createSettings, fetchSettings };
