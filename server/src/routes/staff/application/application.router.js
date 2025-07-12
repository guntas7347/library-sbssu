import { Router } from "express";
import { authorisationLevel } from "../../../middlewares/auth.middlewares.js";
import crs from "../../../utils/crs/crs.js";
import { createLog } from "../../../utils/log.js";
import { findApplications } from "../../../controllers/application.controller.js";
import prisma from "../../../services/prisma.js";
import {
  fetchApplicationById,
  processDecision,
} from "./application.middlewares.js";

const applicationRouter = Router();

applicationRouter.get("/all", authorisationLevel(), async (req, res) => {
  try {
    const d = await findApplications(req.query);
    if (d.length === 0)
      return res.status(204).json(crs.APPLICATION_204_NOT_AVAILABLE(d));

    return res.status(200).json(crs.APPLICATION_200_SEARCHED(d));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

applicationRouter.get("/one", authorisationLevel(), async (req, res) => {
  try {
    const doc = await prisma.member.findUnique({
      where: { id: req.query.id },
    });
    if (!doc) return res.status(404).json(crs.APPLICATION_204_NOT_AVAILABLE());
    return res.status(200).json(crs.APPLICATION_200_FETCHED(doc));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
}); //fetch-one-application

applicationRouter.post(
  "/process",
  authorisationLevel(),
  fetchApplicationById,
  processDecision,
  // sendApprovalRejectionEmail,
  async (req, res) => {
    try {
      if (req.context.decision)
        return res.status(200).json(crs.APPLICATION_200_APPROVED());
      else return res.status(200).json(crs.APPLICATION_200_REJECTED());
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL());
    }
  }
); //process-application

export default applicationRouter;
