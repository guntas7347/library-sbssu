import { Router } from "express";
import prisma from "../../../services/prisma.js";
import { hashPassword } from "../../../utils/bycrypt.js";
import { createLog } from "../../../utils/log.js";
import { authorisationLevel } from "../../../middlewares/auth/auth.middlewares.js";
import { findStaffHandler } from "../../../middlewares/staff/findStaff.js";
import { fetchProfileHandler } from "../../../middlewares/staff/fetchProfile.js";
import validateRequest from "../../../middlewares/validateRequest.js";
import { createStaffSchema } from "../../../schema/staff/createStaffSchema.js";
import { updateStaffSchema } from "../../../schema/staff/updateStaffSchema.js";
import { fetchStaffForEditHandler } from "../../../middlewares/staff/fetchStaffForEdit.js";
import { createStaffHandler } from "../../../middlewares/staff/createStaff.js";
import { updateStaffHandler } from "../../../middlewares/staff/updateStaff.js";
import { fetchStaffHandler } from "../../../middlewares/staff/fetchStaff.js";
import validate from "../../../middlewares/validateRequest.js";
import idSchema from "../../../schema/common/idSchema.js";
import { findStaffSchema } from "../../../schema/staff/findStaffSchema.js";

export async function createStaffInternal() {
  const sampleStaffData = {
    idNumber: 12345,
    fullName: "Guntas Singh",
    email: "guntas7347@gmail.com",
    userName: "guntas7347",
    phoneNumber: "9876543210",
    dateOfBirth: "1990-05-15",
    gender: "male",
    address: "123 Main Street, City",
    emergencyContact: "9876543211",
    employeeId: "EMP001",
    department: "IT",
    designation: "Developer",
    joiningDate: "2023-01-01",
    employmentStatus: "active",
    photo: "",
    role: "staff",
    rights: ["admin"],
  };

  const cust = {
    base32: crypto.randomUUID(),
  };

  try {
    await prisma.$transaction(async (prisma) => {
      const staff = await prisma.staff.create({
        data: {
          idNumber: sampleStaffData.idNumber,
          fullName: sampleStaffData.fullName,
          phoneNumber: sampleStaffData.phoneNumber,
          dateOfBirth: sampleStaffData.dateOfBirth
            ? new Date(sampleStaffData.dateOfBirth)
            : undefined,
          gender: sampleStaffData.gender,
          address: sampleStaffData.address,
          emergencyContact: sampleStaffData.emergencyContact,
          employeeId: sampleStaffData.employeeId,
          department: sampleStaffData.department,
          designation: sampleStaffData.designation,
          joiningDate: sampleStaffData.joiningDate
            ? new Date(sampleStaffData.joiningDate)
            : undefined,
          employmentStatus: sampleStaffData.employmentStatus,
          photo: sampleStaffData.photo,
        },
      });

      const auth = await prisma.auth.create({
        data: {
          username: sampleStaffData.userName,
          password: await hashPassword(crypto.randomUUID()),
          email: sampleStaffData.email,
          role: sampleStaffData.role || "staff",
          userType: "staff",
          rights: sampleStaffData.rights,
          staffId: staff.id,
          twoFaSecret: cust.base32,
        },
      });

      await prisma.staff.update({
        where: { id: staff.id },
        data: { authId: auth.id },
      });
    });

    console.log("Internal staff created successfully.");
  } catch (error) {
    createLog(error);
    console.error("Error creating Internal staff:", error);
  }
} /// for making staff via code (dev only)

// createStaffInternal();

const manageStaffRouter = Router();

manageStaffRouter.get(
  "/all",
  authorisationLevel(["search-staff"]),
  validate(findStaffSchema),
  findStaffHandler
);

manageStaffRouter.get(
  "/one",
  authorisationLevel(["view-staff"]),
  validate(idSchema),
  fetchStaffHandler
);

manageStaffRouter.post(
  "/create",
  authorisationLevel(["admin"]),
  validateRequest(createStaffSchema),
  createStaffHandler
);

manageStaffRouter.post(
  "/update",
  authorisationLevel(["admin"]),
  validateRequest(updateStaffSchema),
  updateStaffHandler
);

manageStaffRouter.get(
  "/edit",
  authorisationLevel(["admin"]),
  validate(idSchema),
  fetchStaffForEditHandler
);

manageStaffRouter.get("/profile", fetchProfileHandler);

export default manageStaffRouter;
