const {
  getAuthStudentByEmail,
} = require("../../../models/auth/student/auth_student.controllers");
const crs = require("../../../utils/custom-response-codes");

const verifyEmailForLogin = async (req, res, next) => {
  try {
    const authStudentDoc = await getAuthStudentByEmail(req.body.email);
    if (authStudentDoc === null) return res.status(404).json(crs.AUTH404STU());
    if (!req.cust) req.cust = {};
    req.cust.password = req.body.password;
    req.cust.hash = authStudentDoc._doc.password;
    req.cust._id = authStudentDoc._doc._id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

module.exports = { verifyEmailForLogin };
