const express = require("express");
const {
  createApplication,
  findApplicationById,
  generateApplicationNumber,
  getPreviousApplicationNumber,
} = require("../../models/applications/applications.controllers");
const { verifyJwt } = require("../auth/passport/jwt");

const applicantRouter = express.Router();

applicantRouter.post("/create-new-application", async (req, res) => {
  try {
    await createApplication({ ...req.body, _id: req.user.id });

    return res
      .status(200)
      .json({ status: "Operation Successful", payload: null });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Error", payload: "error" });
  }
});

applicantRouter.post("/get-application", async (req, res) => {
  try {
    const applicationDoc = await findApplicationById(req.user.id);

    if (applicationDoc === null) {
      return res
        .status(404)
        .json({ status: "Application Not Found", payload: false });
    }

    return res
      .status(200)
      .json({ status: "Application Found", payload: applicationDoc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Error", payload: error });
  }
});

module.exports = { applicantRouter };
