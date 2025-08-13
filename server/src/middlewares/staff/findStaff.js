import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A self-contained handler to fetch a paginated list of staff members.
 */
export const findStaffHandler = async (req, res) => {
  try {
    // 1. Get validated data from the query
    const { filter, value, page, limit } = req.validatedQuery;
    const skip = (page - 1) * limit;

    // 2. Build the 'where' clause for the Prisma query
    let where = {};
    switch (filter) {
      case "fullName":
        if (value) {
          where.fullName = { contains: value, mode: "insensitive" };
        }
        break;
      case "idNumber":
        if (value) {
          const idNum = parseInt(value, 10);
          if (!isNaN(idNum)) {
            where.idNumber = { equals: idNum };
          }
        }
        break;
      default:
        // No additional filters for 'all'
        break;
    }

    // 3. Fetch count and data in a single transaction
    const [totalCount, staffList] = await prisma.$transaction([
      prisma.staff.count({ where }),
      prisma.staff.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          fullName: true,
          gender: true,
          photo: true,
          employeeId: true,
          department: true,
          designation: true,
          phoneNumber: true,
          joiningDate: true,
          employmentStatus: true,
          auth: { select: { email: true, role: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // 4. Handle case where no staff are found
    if (totalCount === 0) {
      return res
        .status(404)
        .json(crs("No staff members found matching your criteria."));
    }

    // 5. Format the data for the frontend
    const staffFormatted = staffList.map((staff) => ({
      id: staff.id,
      fullName: staff.fullName,
      gender: staff.gender,
      photo: staff.photo,
      email: staff.auth?.email,
      employeeId: staff.employeeId,
      role: staff.auth?.role,
      department: staff.department,
      specialization: staff.designation,
      salary: "N/A",
      workSchedule: "Full-Time",
      joinDate: staff.joiningDate
        ? new Date(staff.joiningDate).toLocaleDateString()
        : "N/A",
      phone: staff.phoneNumber,
      status: staff.employmentStatus?.toLowerCase() || "inactive",
    }));

    const totalPages = Math.ceil(totalCount / limit);

    return res.status(200).json(
      crs.STAFF_200_ALL_FETCHED({
        data: staffFormatted,
        totalPages,
        currentPage: page,
        totalCount,
      })
    );
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
