const express = require("express");

const settingsRouter = express.Router();

settingsRouter.post("/add-program", async (req, res) => {});

settingsRouter.get("/get-academic-programs", async (req, res) => {
  const bachelorPrograms = [
    {
      value: "BTECH",
      name: "Bachelor of Technology",
    },
    {
      value: "BCA",
      name: "Bachelor of Computer Applications",
    },
    {
      value: "BSC",
      name: "Bachelor of Science",
    },
    {
      value: "BBA",
      name: "Bachelor of Business Administration",
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
    {
      value: "MBBS",
      name: "Bachelor of Medical and Surgery",
    },
  ];

  return res.status(200).json({ success: true, data: bachelorPrograms });
});

module.exports = { settingsRouter };
