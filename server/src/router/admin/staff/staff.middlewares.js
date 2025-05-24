const { default: mongoose } = require("mongoose");
const {
  createAuthAdmin,
  getAuthAdmin,
} = require("../../../models/auth/aduth_admin.controllers");
const {
  createNewStaff,
  updateStaffById,
} = require("../../../models/staff/staff.controllers");
const crs = require("../../../utils/custom-response-codes");
const { createLog, handleMongoError } = require("../../../utils/functions");
const Staff = require("../../../models/staff/staff.schema");

const verifyEmailAvailability = async (req, res, next) => {
  try {
    const authAdmin = await getAuthAdmin({ email: req.body.email });
    if (authAdmin !== null) return res.status(409).json(crs.AUTH409AADM());
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST());
  }
};

const createStaffManualDev = async (doc) => {
  const staffDoc = await createNewStaff(doc);
  const authDoc = await createAuthAdmin({
    ...doc,
    staffId: staffDoc[0].id,
    userName: doc.fullName,
  });
  await updateStaffById(staffDoc[0].id, { authId: authDoc[0].id });
};

const createStaff = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const [{ _id: staffId }] = await Staff.create([req.body], { session });
      const [{ _id: authId }] = await createAuthAdmin(
        { ...req.body, staffId, twoFaSecret: req.cust.base32 },
        session
      );
      await Staff.findByIdAndUpdate(staffId, { authId }, { session });
    });
    await session.commitTransaction();
    next();
  } catch (error) {
    createLog(error);
    if (session.inTransaction()) await session.abortTransaction();
    if (error.code === 11000)
      return res.status(200).json(crs.MONGO11000ERR(error));
    return res.status(500).json(crs.SERR500REST());
  } finally {
    session.endSession();
  }
};

module.exports = {
  verifyEmailAvailability,
  createStaff,
  createStaffManualDev,
};
