import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches the complete profile for a single staff member.
 *
 * @param {string} staffId - The unique ID of the staff member to fetch.
 * @returns {Promise<object|false>} A formatted object with all staff details, or false if not found.
 */
export const fetchStaffHandler = async (req, res) => {
  try {
    const { id } = req.validatedQuery;

    // 1. Fetch the staff record and include the related Auth record.
    const staff = await prisma.staff.findUnique({
      where: { id },
      include: {
        // We need the Auth record to get the user's email, role, and rights.
        auth: {
          select: {
            email: true,
            role: true,
            rights: true,
          },
        },
      },
    });

    // 2. If no staff member is found with the given ID, return false.
    if (!staff) return false;

    // 3. Combine the data from the Staff and Auth records into a single, clean object.
    const profileData = {
      // All fields from the Staff model
      id: staff.id,
      fullName: staff.fullName,
      photo: staff.photo,
      phoneNumber: staff.phoneNumber,
      dateOfBirth: staff.dateOfBirth,
      gender: staff.gender,
      address: staff.address,
      emergencyContact: staff.emergencyContact,
      employeeId: staff.employeeId,
      department: staff.department,
      designation: staff.designation,
      joiningDate: staff.joiningDate,
      employmentStatus: staff.employmentStatus,

      // Fields from the related Auth model
      email: staff.auth?.email,
      role: staff.auth?.role,
      rights: staff.auth?.rights || [], // Default to an empty array
    };

    return res.status(200).json(crs.STAFF_200_FETCHED(profileData));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
