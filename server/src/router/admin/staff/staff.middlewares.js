const {
  createAuthAdmin,
  getAuthAdmin,
} = require("../../../models/auth/aduth_admin.controllers");
const {
  createNewStaff,
  updateStaffById,
} = require("../../../models/staff/staff.controllers");
const crs = require("../../../utils/custom-response-codes");
const {
  createLog,
  handleMongoError,
  uuidGenerator,
} = require("../../../utils/functions");
const db = require("../../../services/prisma");
const { createPasswordHash } = require("../../../models/auth/functions");

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
  try {
    await db.$transaction(async (db) => {
      // 1. Create Staff
      const staff = await db.staff.create({
        data: {
          idNumber: req.body.idNumber,
          fullName: req.body.fullName,
          phoneNumber: req.body.phoneNumber,
          dateOfBirth: req.body.dateOfBirth
            ? new Date(req.body.dateOfBirth)
            : undefined,
          gender: req.body.gender,
          address: req.body.address,
          emergencyContact: req.body.emergencyContact,
          employeeId: req.body.employeeId,
          department: req.body.department,
          designation: req.body.designation,
          joiningDate: req.body.joiningDate
            ? new Date(req.body.joiningDate)
            : undefined,
          employmentStatus: req.body.employmentStatus,
          imageUrl: req.body.imageUrl,
        },
      });

      // 2. Create Auth
      const auth = await db.auth.create({
        data: {
          email: req.body.email,
          password: await createPasswordHash(uuidGenerator()),
          role: req.body.role || "STAFF",
          rights: req.body.rights || [],
          staffId: staff.id,
          twoFaSecret: req.cust.base32,
        },
      });

      // 3. Update Staff with authId (optional if needed)
      await db.staff.update({
        where: { id: staff.id },
        data: { authId: auth.id },
      });
    });

    next();
  } catch (error) {
    createLog(error);
    if (error.code === "P2002") {
      return res.status(200).json(crs.MONGO11000ERR(error)); // Customize if needed
    }
    return res.status(500).json(crs.SERR500REST());
  }
};

// const createStaff = async (req, res, next) => {
//   const session = await mongoose.startSession();
//   try {
//     await session.withTransaction(async () => {
//       const [{ _id: staffId }] = await Staff.create([req.body], { session });
//       const [{ _id: authId }] = await createAuthAdmin(
//         { ...req.body, staffId, twoFaSecret: req.cust.base32 },
//         session
//       );
//       await Staff.findByIdAndUpdate(staffId, { authId }, { session });
//     });
//     await session.commitTransaction();
//     next();
//   } catch (error) {
//     createLog(error);
//     if (session.inTransaction()) await session.abortTransaction();
//     if (error.code === 11000)
//       return res.status(200).json(crs.MONGO11000ERR(error));
//     return res.status(500).json(crs.SERR500REST());
//   } finally {
//     session.endSession();
//   }
// };

module.exports = {
  verifyEmailAvailability,
  createStaff,
  createStaffManualDev,
};
