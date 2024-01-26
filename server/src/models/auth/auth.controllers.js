const { Auth_Admin, Auth_Applicant, Auth_Student } = require("./auth.schema");
const { createPasswordHash } = require("./functions");

const createUser = async (userCredentials, role = "APPLICANT") => {
  const { displayName, email, password } = userCredentials;
  await AuthMongo.create({
    userName: displayName,
    email: email,
    password: await createPasswordHash(password),
    role,
    createdAt: new Date(),
  });
};

const findUser = async (email) => {
  return await AuthMongo.findOne({ email }).select("email password role");
};

const findUserById = async (id) => {
  return await AuthMongo.findById(id).select("email password role");
};

const getAuthRoleById = async (id, role) => {
  switch (role) {
    case "ADMIN":
      return await Auth_Admin.findById(id).select("role -_id");
      break;

    case "STAFF":
      return await Auth_Admin.findById(id).select("role -_id");
      break;

    case "STUDENT":
      return await Auth_Student.findById(id).select("role -_id");
      break;

    case "APPLICANT":
      return await Auth_Applicant.findById(id).select("role -_id");
      break;

    default:
      return await AuthMongo.findById(id).select("role -_id");
      break;
  }
};

const updateAuthRole = async (id, role) => {
  return await AuthMongo.findByIdAndUpdate(id, { role });
};

const changePassword = async (id, password) => {
  return await AuthMongo.findByIdAndUpdate(id, {
    password: await createPasswordHash(password),
  });
};

module.exports = {
  createUser,
  findUser,
  findUserById,
  updateAuthRole,
  getAuthRoleById,
  changePassword,
};
