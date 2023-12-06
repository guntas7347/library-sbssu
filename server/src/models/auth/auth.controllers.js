const AuthMongo = require("./auth.schema");
const { createPasswordHash } = require("./functions");

const createUser = async (userCredentials, role = "APPLICANT") => {
  const { email, password } = userCredentials;
  await AuthMongo.create({
    userName: email,
    email: email,
    password: await createPasswordHash(password),
    role,
    createdAt: new Date(),
  });
};

const findUser = async (email) => {
  return await AuthMongo.findOne({ email }).select("email password role");
};

const getAuthRoleById = async (id) => {
  return await AuthMongo.findById(id).select("role -_id");
};

const updateAuthRole = async (id, role) => {
  return await AuthMongo.findByIdAndUpdate(id, { role });
};

module.exports = { createUser, findUser, updateAuthRole, getAuthRoleById };
