const Setting = require("./setting.schema");

const createSettings = async (req) => {
  try {
    await Setting.create(req);
    console.log("CREATED SETTINGS: " + req.value);
  } catch (error) {
    createLog(error);
  }
}; //disable in production

const fetchSettings = async (key) => {
  return await Setting.findOne({ key }).lean();
};

module.exports = { createSettings, fetchSettings };
