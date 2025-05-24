const express = require("express");
const Member = require("../../../models/member/member.schema");
const { joi_applicantDetails } = require("./member-joi");
const crs = require("../../../utils/custom-response-codes");
const { encryptText, decrptText } = require("../../auth/jwt");
const { createLog } = require("../../../utils/functions");

const public_memberRouter = express.Router();

public_memberRouter.post("/join", joi_applicantDetails, async (req, res) => {
  try {
    const prevApl = await Member.findOne().sort({ _id: -1 });
    let prevAppId = 10000;
    if (prevApl) prevAppId = prevApl.applicationId;
    const { _id } = await Member.create({
      ...req.body,
      applicationId: prevAppId + 1,
    });

    const cookieOptions = {
      // secure: true, // only use for production
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28),
      path: "/",
    };

    res.cookie("gh", encryptText(_id.toString()), cookieOptions);

    return res.status(201).json(crs.STU201CNA({ _id }));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

public_memberRouter.post("/fetch", async (req, res) => {
  try {
    let _id = "";
    if (req.body.type === "url") _id = req.body._id;
    else _id = decrptText(req.body._id);
    const d = await Member.findById(_id).where({ status: "APPLIED" }).lean();
    return res.status(201).json(crs.STU200FA(d));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

public_memberRouter.post("/delete", async (req, res) => {
  try {
    const _id = decrptText(req.body.gh);
    const d = await Member.findByIdAndDelete(_id)
      .where({ status: "APPLIED" })
      .lean();
    // todo:pending image deletion
    return res.status(201).json(crs.STU201DA());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

module.exports = { public_memberRouter };
