import { Router } from "express";
import prisma from "../../../services/prisma.js";
import { hashPassword } from "../../../utils/bycrypt.js";
import { createLog } from "../../../utils/log.js";
import { authorisationLevel } from "../../../middlewares/auth.middlewares.js";
import crs from "../../../utils/crs/crs.js";
import { getStaff } from "../../../controllers/staff.controller.js";

export async function createStaffInternal() {
  const sampleStaffData = {
    idNumber: 12345,
    fullName: "Guntas Singh",
    email: "guntas7347@gmail.com",
    userName: "guntas7347",
    phoneNumber: "9876543210",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    address: "123 Main Street, City",
    emergencyContact: "9876543211",
    employeeId: "EMP001",
    department: "IT",
    designation: "Developer",
    joiningDate: "2023-01-01",
    employmentStatus: "Active",
    photo: "",
    role: "STAFF",
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
          role: sampleStaffData.role || "STAFF",
          userType: "STAFF",
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

    console.log("Sample staff created successfully.");
  } catch (error) {
    createLog(error);
    console.error("Error creating sample staff:", error);
  }
} /// for making staff via code (dev only)

const manageStaffRouter = Router();

manageStaffRouter.get(
  "/all",
  authorisationLevel(["search-staff"]),
  async (req, res) => {
    try {
      const staff = await getStaff(req.query);
      console.log(staff);
      return res.status(200).json(crs.STAFF_200_ALL_FETCHED(staff));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
); //search-all-staff

manageStaffRouter.get(
  "/one",
  authorisationLevel(["view-staff"]),
  async (req, res) => {
    try {
      var staffDoc = await prisma.staff.findUnique({
        where: { id: req.query.id },
        include: {
          auth: { select: { email: true, rights: true, username: true } },
        },
      });
      staffDoc = { ...staffDoc, ...staffDoc.auth };
      delete staffDoc.auth;

      return res.status(200).json(crs.STAFF_200_FETCHED(staffDoc));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
); //fetch

export default manageStaffRouter;
