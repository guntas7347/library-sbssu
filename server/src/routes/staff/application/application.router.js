import { Router } from "express";
import { authorisationLevel } from "../../../middlewares/auth/auth.middlewares.js";
import { findApplicationsHandler } from "../../../middlewares/application/findApplications.js";
import validateRequest from "../../../middlewares/validateRequest.js";
import { decisionSchema } from "../../../schema/application/decisionSchema.js";
import { handleApplicationDecision } from "../../../middlewares/application/handleDecision.js";
import { fetchApplicationHandler } from "../../../middlewares/application/fetchApplicationDetails.js";
import validate from "../../../middlewares/validateRequest.js";
import { findApplicationSchema } from "../../../schema/application/findApplicationSchema.js";
import idSchema from "../../../schema/common/idSchema.js";

const applicationRouter = Router();

applicationRouter.get(
  "/all",
  authorisationLevel(["view_applicants"]),
  validate(findApplicationSchema),
  findApplicationsHandler
);

applicationRouter.get(
  "/one",
  authorisationLevel(["view_applicants"]),
  validate(idSchema),
  fetchApplicationHandler
);

applicationRouter.post(
  "/process",
  authorisationLevel(["approve_applications"]),
  validateRequest(decisionSchema),
  handleApplicationDecision
);

export default applicationRouter;
