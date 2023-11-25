const express = require("express");
const {
  createNewStudent,
  fetchAllStudents,
  fetchStudentByRollNumber,
} = require("../../../models/students/students.modals");
const {
  createStudentCard,
} = require("../../../models/student-cards/student-cards.modals");

const studentsRoute = express.Router();

studentsRoute.post("/create-student", async (req, res) => {
  try {
    await createNewStudent(req.body);
    return res
      .status(200)
      .json({ success: true, message: "Student created successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error._message });
  }
});

studentsRoute.get("/fetch-all-students", async (req, res) => {
  const data = await fetchAllStudents();
  return res.status(200).json({ success: true, message: data });
});

studentsRoute.post("/fetch-student-by-roll-number", async (req, res) => {
  try {
    const student = await fetchStudentByRollNumber(req.body.rollNumber);
    if (student != null) {
      return res.status(200).json({ success: true, message: student });
    }
    return res
      .status(404)
      .json({ success: false, message: "Invalid Roll Number" });
  } catch (error) {
    console.log(error.errors);
    return res.status(404).json({ success: false, message: error._message });
  }
});

studentsRoute.post("/create-student-card", async (req, res) => {
  try {
    const { _id } = await fetchStudentByRollNumber(req.body.rollNumber);

    await createStudentCard({
      cardNumber: req.body.cardNumber,
      status: "available",
      studentId: _id,
    });

    if (_id != null) {
      return res.status(200).json({
        success: true,
        message: "Student Card has been successfully created",
      });
    }
    return res
      .status(404)
      .json({ success: false, message: "Invalid Roll Number" });
  } catch (error) {
    console.log(error.errors);
    return res.status(404).json({ success: false, message: error._message });
  }
});

module.exports = { studentsRoute };
