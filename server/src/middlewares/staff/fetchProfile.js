import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

export const fetchProfileHandler = async (req, res) => {
  try {
    const staffId = await prisma.staff.findFirst({
      where: { authId: req.user.uid },
      select: { id: true },
    });

    // If no staff profile is linked, we can't proceed.
    if (!staffId) {
      return res
        .status(404)
        .json(crs("Staff profile not found for the authenticated user."));
    }

    // 1. Fetch the core staff profile and their direct relations.
    // CHANGE: Updated _count to use `issuedCirculations` instead of `issuedBooks`.
    const staff = await prisma.staff.findFirst({
      where: { authId: req.user.uid },
      include: {
        auth: {
          select: { email: true }, // Get email from the related Auth record
        },
        _count: {
          select: {
            issuedCirculations: true, // This is the new relation name
            libraryCards: true, // Counts cards created, a proxy for members approved
          },
        },
      },
    });

    if (!staff) {
      return res
        .status(404)
        .json(crs("Staff profile data could not be loaded."));
    }

    // 2. Fetch recent activities separately for a combined timeline.
    // CHANGE: Switched from `issuedBook` to `circulation` model.
    const recentCirculations = await prisma.circulation.findMany({
      where: { issuedById: staffId.id },
      orderBy: { issueDate: "desc" },
      take: 5,
      select: {
        id: true,
        issueDate: true,
        bookAccession: { select: { book: { select: { title: true } } } },
      },
    });

    // 3. Format the data into a clean structure for the frontend.
    // CHANGE: Mapped over `recentCirculations`.
    const issueActivities = recentCirculations.map((c) => ({
      id: c.id,
      type: "book_issue",
      description: `Issued book: ${c.bookAccession.book.title}`,
      date: c.issueDate,
    }));

    // Combine and sort all activities by date
    const activityHistory = [...issueActivities].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // 4. Assemble the final response object.
    const profileData = {
      // Personal & Contact
      fullName: staff.fullName,
      photo: staff.photo,
      email: staff.auth?.email,
      phoneNumber: staff.phoneNumber,
      address: staff.address,
      emergencyContact: staff.emergencyContact,
      dateOfBirth: staff.dateOfBirth,
      gender: staff.gender,

      // Employment
      idNumber: staff.idNumber,
      employeeId: staff.employeeId,
      department: staff.department,
      designation: staff.designation,
      joiningDate: staff.joiningDate,
      employmentStatus: staff.employmentStatus,

      // Stats
      // CHANGE: Updated the count to use the new relation name.
      stats: {
        booksIssued: staff._count.issuedCirculations,
        membersApproved: staff._count.libraryCards,
      },

      // History
      activityHistory,
    };

    return res.status(200).json(crs.STAFF_200_FETCHED(profileData));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
