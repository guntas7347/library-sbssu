import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Fetches all the necessary data for a staff member to populate the edit form.
 *
 * @param {string} staffId - The unique ID of the staff member to fetch for editing.
 * @returns {Promise<object|false>} A formatted object with all staff and auth details, or false if not found.
 */
export const fetchStaffForEditHandler = async (req, res) => {
  try {
    const { id } = req.validatedQuery;
    // 1. Fetch the staff record and include the related Auth record to get all details.
    const staff = await prisma.staff.findUnique({
      where: { id },
      include: {
        // We need the Auth record to get the user's username, email, and rights.
        auth: {
          select: {
            username: true,
            email: true,
            rights: true,
          },
        },
      },
    });

    // 2. If no staff member is found with the given ID, return false.
    if (!staff) {
      return false;
    }

    // 3. Combine the data from the Staff and Auth records into a single, flat object
    // that can be directly used by the frontend's `setFields` function.
    const formData = {
      // All fields from the Staff model
      fullName: staff.fullName,
      photo: staff.photo,
      phoneNumber: staff.phoneNumber,
      dateOfBirth: staff.dateOfBirth,
      gender: staff.gender,
      idNumber: staff.idNumber,
      employeeId: staff.employeeId,
      department: staff.department,
      designation: staff.designation,
      joiningDate: staff.joiningDate,
      employmentStatus: staff.employmentStatus,

      // Fields from the related Auth model
      username: staff.auth?.username,
      email: staff.auth?.email,
      rights: staff.auth?.rights || [], // Default to an empty array if no rights are set
    };

    return res.status(200).json(crs.STAFF_200_FETCHED(formData));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
