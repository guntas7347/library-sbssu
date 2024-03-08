const express = require("express");

const settingsRouter = express.Router();

settingsRouter.post("/add-program", async (req, res) => {});

settingsRouter.get("/get-academic-programs", async (req, res) => {
  const bachelorPrograms = [
    {
      value: "BTECH",
      name: "Bachelor of Technology",
      branches: [
        { name: "Computer Science and Engineering", value: "CSE" },
        { name: "Electrical Engineering", value: "EE" },
        { name: "Mechanical Engineering", value: "ME" },
        { name: "Civil Engineering", value: "CE" },
        { name: "Electronics and Communication Engineering", value: "ECE" },
        { name: "Information Technology", value: "IT" },
        { name: "Chemical Engineering", value: "ChemE" },
      ],
    },
    {
      value: "BCA",
      name: "Bachelor of Computer Applications",
      branches: [
        {
          value: "CS",
          name: "Computer Science",
        },
        {
          value: "IT",
          name: "Information Technology",
        },
        {
          value: "SE",
          name: "Software Engineering",
        },
        {
          value: "DBMS",
          name: "Database Management System",
        },
        {
          value: "NW",
          name: "Networking",
        },
      ],
    },
    {
      value: "BSC",
      name: "Bachelor of Science",
      branches: [
        {
          value: "Math",
          name: "Mathematics",
        },
        {
          value: "Physics",
          name: "Physics",
        },
        {
          value: "Chem",
          name: "Chemistry",
        },
        {
          value: "Bio",
          name: "Biology",
        },
        {
          value: "CompSci",
          name: "Computer Science",
        },
      ],
    },
    {
      value: "BBA",
      name: "Bachelor of Business Administration",
      branches: [
        {
          value: "Mkt",
          name: "Marketing",
        },
        {
          value: "Fin",
          name: "Finance",
        },
        {
          value: "HR",
          name: "Human Resources",
        },
        {
          value: "Ops",
          name: "Operations",
        },
        {
          value: "Mgmt",
          name: "Management",
        },
      ],
    },
    {
      value: "BA",
      name: "Bachelor of Arts",
    },
    {
      value: "BCom",
      name: "Bachelor of Commerce",
    },
    {
      value: "BED",
      name: "Bachelor of Education",
    },
    {
      value: "BPHARMA",
      name: "Bachelor of Pharmacy",
    },
    {
      value: "BARCH",
      name: "Bachelor of Architecture",
    },
  ];

  return res.status(200).json({ success: true, data: bachelorPrograms });
});

module.exports = { settingsRouter };
