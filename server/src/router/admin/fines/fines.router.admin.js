const express = require("express");
const crs = require("../../../utils/custom-response-codes");
const {
  getFines,
  getFineById,
  updateFineById,
} = require("../../../models/fines/fines.controllers");
const { authorisationLevel } = require("../../auth/auth.middlewares");

const finesRouter = express.Router();

finesRouter.post(
  "/fetch-all-fines",
  authorisationLevel(2),
  async (req, res) => {
    try {
      const finesCol = await getFines({
        filter: req.query.filter,
        filterValue: req.query.filterValue,
        page: req.query.page || 1,
      });

      const finesData = finesCol.finesArray.map((fineDoc) => {
        return {
          _id: fineDoc._id,
          createdAt: new Date(fineDoc.createdAt).toDateString(),
          fullName: fineDoc.memberId.fullName,
          rollNumber: fineDoc.memberId.rollNumber,
          category: fineDoc.category,
          amount: fineDoc.amount,
          recieptNumber: fineDoc.recieptNumber ? fineDoc.recieptNumber : "NULL",
        };
      });

      return res.status(200).json(crs.FIN200FAF(finesData));
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

finesRouter.post("/fetch-fine-doc", authorisationLevel(2), async (req, res) => {
  try {
    const fineDoc = await getFineById(req.body._id, true);
    const data = {
      _id: fineDoc._id,
      createdAt: new Date(fineDoc.createdAt).toDateString(),
      fullName: fineDoc.memberId.fullName,
      rollNumber: fineDoc.memberId.rollNumber,
      category: fineDoc.category,
      amount: fineDoc.amount,
      recieptNumber: fineDoc.recieptNumber ? fineDoc.recieptNumber : "NULL",
    };
    return res.status(200).json(crs.FIN200FFBI(data));
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

finesRouter.post(
  "/add-reciept-number",
  authorisationLevel(2),
  async (req, res) => {
    try {
      await updateFineById(req.body._id, {
        recieptNumber: req.body.recieptNumber,
      });
      return res.status(200).json(crs.FIN200ARN());
    } catch (err) {
      console.log(err);
      return res.status(500).json(crs.SERR500REST(err));
    }
  }
);

module.exports = { finesRouter };
