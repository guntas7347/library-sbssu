import prisma from "../services/prisma.js";

export const getStaff = async (queryParam) => {
  const { name: filter, value: filterValue, page = 1 } = queryParam;

  const pageSize = 25;
  const skip = (page - 1) * pageSize;

  let where = {};
  let totalCount = 0;

  switch (filter) {
    case "fullName":
      where = {
        fullName: {
          contains: filterValue,
          mode: "insensitive",
        },
      };
      break;

    case "employeeId":
      where = {
        employeeId: {
          contains: filterValue,
          mode: "insensitive",
        },
      };
      break;

    default:
      break;
  }

  totalCount = await prisma.staff.count({ where });

  const staffList = await prisma.staff.findMany({
    where,
    skip,
    take: pageSize,
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
      auth: {
        select: {
          email: true,
          role: true,
        },
      },
    },
  });

  // Transform data for frontend use
  const staffFormatted = staffList.map((staff) => ({
    id: staff.id,
    fullName: staff.fullName || "Unknown",
    gender: staff.gender || "male",
    photo: staff.photo || null,
    email: staff.auth?.email || "No Email",
    role: staff.auth?.role || "staff",
    employeeId: staff.employeeId || "N/A",
    department: staff.department || "General",
    specialization: staff.designation || "N/A",
    phone: staff.phoneNumber || "N/A",
    joinDate: staff.joiningDate?.toISOString().split("T")[0] || "Unknown",
    workSchedule: "full_time", // optional placeholder unless stored in model
    salary: "₹0", // add if available in model
    status:
      staff.employmentStatus?.toLowerCase() === "active"
        ? "active"
        : "inactive",
  }));

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: staffFormatted,
    totalPages,
  };
};
