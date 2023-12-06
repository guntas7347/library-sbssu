const express = require("express");
const {
  createNewStudent,
  fetchAllStudents,
  fetchStudentByRollNumber,
  addLibraryCardToStudent,
} = require("../../../models/students/students.controllers");
const {
  createLibraryCard,
  fetchLibraryCardsByStudentId,
  fetchLibraryCardByCardNumber,
} = require("../../../models/library-cards/library-cards.controllers");
const { formatObjectValues } = require("../../../utils/functions");
const {
  fetchAllApplications,
  fetchOneApplication,
  updateApplicationStatus,
} = require("../../../models/applications/applications.controllers");
const { updateAuthRole } = require("../../../models/auth/auth.controllers");

const studentsRoute = express.Router();

studentsRoute.post("/create-student", async (req, res) => {
  try {
    const rollNumber = await fetchStudentByRollNumber(req.body.rollNumber);

    if (rollNumber != null) {
      return res.status(400).json({
        success: false,
        status: "Roll Number already exists",
        payload: null,
      });
    }

    const formatedData = formatObjectValues(req.body, [
      "gender",
      "specialization",
      "program",
      "email",
    ]);

    await createNewStudent(formatedData);

    return res.status(200).json({
      success: true,
      status: "Student created successfully",
      payload: null,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, status: error, payload: null });
  }
});

studentsRoute.post("/fetch-all-students", async (req, res) => {
  const StudentsCol = await fetchAllStudents(req.body);
  return res.status(200).json({
    success: true,
    payload: StudentsCol,
    status: "Operation Successful",
  });
});

studentsRoute.post("/fetch-student-by-roll-number", async (req, res) => {
  try {
    const studentDoc = await fetchStudentByRollNumber(
      req.body.rollNumber,
      true
    );

    if (studentDoc != null) {
      return res.status(200).json({
        success: true,
        payload: studentDoc,
        status: "Successful",
      });
    }
    return res
      .status(400)
      .json({ success: false, payload: null, status: "Invalid Roll Number" });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, payload: null, status: error });
  }
});

studentsRoute.post("/create-library-card", async (req, res) => {
  try {
    const { _id, libraryCards } = await fetchStudentByRollNumber(
      req.body.rollNumber
    );
    if (libraryCards.length >= 2) {
      return res.status(400).json({
        success: false,
        payload: null,
        status: "Student alread holds two cards.",
      });
    }

    const libraryCard = await fetchLibraryCardByCardNumber(req.body.cardNumber);
    if (libraryCard != null) {
      return res.status(400).json({
        success: false,
        payload: null,
        status: "Card number already exists",
      });
    }

    if (_id != null) {
      await createLibraryCard({
        cardNumber: req.body.cardNumber,
        status: "available",
        studentId: _id,
      }).then(({ studentId, _id }) => {
        addLibraryCardToStudent(studentId, _id);
      });

      return res.status(200).json({
        success: true,
        payoad: null,
        status: "Library Card has been successfully created",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, payload: null, status: "Invalid Roll Number" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, payload: error, status: "Operation Failed" });
  }
});

studentsRoute.post("/fetch-all-applications", async (req, res) => {
  try {
    const ApplicantCol = await fetchAllApplications(req.body);
    return res.status(200).json({
      success: true,
      payload: ApplicantCol,
      status: "Operation Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      payload: null,
      status: "Operation Failed",
    });
  }
});

studentsRoute.post("/fetch-one-application", async (req, res) => {
  try {
    const ApplicantionDoc = await fetchOneApplication(
      req.body.applicationNumber
    );

    if (ApplicantionDoc === null) {
      return res.status(400).json({
        payload: null,
        status: "Invalid Application Number",
      });
    }

    return res.status(200).json({
      payload: ApplicantionDoc,
      status: "Operation Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      payload: null,
      status: "Operation Failed",
    });
  }
});

studentsRoute.post("/process-application", async (req, res) => {
  try {
    const ApplicantionDoc = await fetchOneApplication(
      req.body.applicationNumber
    );
    const applicantId = ApplicantionDoc._doc._id;

    if (ApplicantionDoc._doc.status !== "PENDING") {
      return res.status(400).json({
        payload: null,
        status: "Application decision has already been made",
      });
    }

    if (req.body.decision === "REJECT") {
      await updateApplicationStatus(_id, "REJECTED");
      return res.status(200).json({
        payload: null,
        status: "Operation Successful",
      });
    }

    const { _id } = await createNewStudent(ApplicantionDoc._doc);
    await updateApplicationStatus(applicantId, "APPROVED");
    await updateAuthRole(applicantId, "STUDENT");

    return res.status(200).json({
      payload: null,
      status: "Operation Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      payload: null,
      status: "Operation Failed",
    });
  }
});

module.exports = { studentsRoute };
