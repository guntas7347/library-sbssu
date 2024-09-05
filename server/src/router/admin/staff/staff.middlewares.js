const { default: mongoose } = require("mongoose");
const {
  createAuthAdmin,
  getAuthAdmin,
} = require("../../../models/auth/admin/aduth_admin.controllers");
const { createNewStaff } = require("../../../models/staff/staff.controllers");
const crs = require("../../../utils/custom-response-codes");

const verifyEmailAvailability = async (req, res, next) => {
  try {
    const authAdmin = await getAuthAdmin({ email: req.body.email });
    if (authAdmin !== null) return res.status(409).json(crs.AUTH409AADM());
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST());
  }
};

const createStaffAndAuthAdmin = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const staffDoc = await createNewStaff(req.body);
      await createAuthAdmin({
        ...req.body,
        staffId: staffDoc.id,
        userName: req.body.fullName,
      });
    });
    await session.commitTransaction();
    next();
  } catch (error) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST());
  } finally {
    session.endSession();
  }
};

module.exports = { verifyEmailAvailability, createStaffAndAuthAdmin };
